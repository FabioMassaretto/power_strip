import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import $ from 'jquery';

import EventTile from './EventTile.jsx';

const IntlPolyfill = require('intl');
var DateTimeFormat = global.Intl.DateTimeFormat || IntlPolyfill.DateTimeFormat;


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};


export default React.createClass({

  getInitialState : function getInitialState(){
    var default_day = new Date();
    
    if (default_day.getHours()>=12) {
      default_day.setDate(default_day.getDate()+1)
    }

    default_day.setHours(12,0,0,0);


    return {
      open: false,
      default_day: default_day,
      dialog_title:"Schedule an Event",
      step:'start',
      prior_step: null,
      close_label: 'cancel',
      dialog_button_focused: false,
      event_content: {
        selected_day: default_day,
        start_time: null,
        stop_time: null,
      }
    }
  },

  handleOpen : function handleOpen(){
    this.setState({open: true});
  },

  handleClose : function handleClose(){
    this.setState({open:false});
    if ( (this.state.start_time && this.state.selected_day) || (this.state.stop_time && this.state.selected_day) ){
      this.handleEventSubmit();
    }
  },

  handleEventSubmit: function handleEventSubmit(){
    var selected_day = this.state.event_content.selected_day;
    var start_time = this.state.event_content.start_time;
    var stop_time = this.state.event_content.stop_time;

    if (start_time){
      var start_date = new Date(selected_day.getFullYear(), selected_day.getMonth(), selected_day.getDate(), start_time.getHours(), start_time.getMinutes())
    }
    if (stop_time){
      var stop_date = new Date(selected_day.getFullYear(), selected_day.getMonth(), selected_day.getDate(), stop_time.getHours(), stop_time.getMinutes())
    }

    var submittedEvent = {
      event: {
        start_date: start_date || null,
        stop_date: stop_date || null
      }
    }

    $.post( `/api/switches/${this.props.currSwitch.id}`, submittedEvent, function( data ) {
      console.log(data);
    });
  },

  handleStartTime: function handleStartTime(event, date){
    this.updateEventContent("start_date", date);
  },

  handleStopTime: function handleStopTime(event, date){
    this.updateEventContent("stop_date", date);
  },

  handleSelectDate: function handleSelectDate(event, date){
    this.updateEventContent("selected_day", date);
  },

  updateEventContent: function updateEventContent(key, value){
    var updated_event = {};
    for (var initial_key in this.state.event_content){
      updated_event[initial_key] = this.state.event_content[initial_key];
    }
    updated_event[key] = value;

    this.setState({event_content: updated_event});
  },

  setStep: function setStep(input){

    switch (input){
      case "start":
        return this.setState({
            step:"start", 
            prior_step:null, 
            dialog_title: "Schedule an Event", 
          }
        );

      // Single Event Branch 
      case "single_date":
        this.updateEventContent("event_type", "single")
        return this.setState({
            step:"single_date", 
            prior_step:"start",
            dialog_title:"Single Event", 
           }
        );
      case 'single_start_time':
        return this.setState({
          step:"single_start_time",
          prior_step:"single_date",
        });
      case "switch_select":
        return this.setState({
          step:"switch_select"
        })

      // Recurring Event Branch
      case "recurring":
        this.updateEventContent("event_type", "single")
        return this.setState({
            step:"recurring_days", 
            prior_step:"start",
            dialog_title:"Recurring Event", 
           }
        );
      
    }
  },

  getStepContent: function getStepContent(step){
    var style = {
      margin: 12,
    };

    switch(step){
      case "start":
        return (
          <div>
            <p>Is your new event single, or recurring?</p>
            <RaisedButton label="Single" style={style} onTouchTap={()=>this.setStep('single_date')}/>
            <RaisedButton label="Recurring" style={style} onTouchTap={()=>this.setStep('recurring_days')}/>
          </div>
        );
      case "single_date":
        return (
          <div>
            <EventTile 
              event_content={this.state.event_content}
            />
            <hr/>
            <p>What day will the event occur?</p>
            <DatePicker 
              hintText="Start Day"
              value={this.state.event_content.selected_day}
              onChange={this.handleSelectDate}
              formatDate={new DateTimeFormat('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }).format}
            />
            <RaisedButton
              label={"back"}
              keyboardFocused={false}
              onTouchTap={()=>this.setStep(this.state.prior_step)}
            />
            <RaisedButton
              label={"next"}
              primary={true}
              onTouchTap={()=>this.setStep(this.setStep('single_start_time'))}
            />
          </div>
        );
      case "single_start_time":
        return (
          <div>
            <EventTile 
              event_content={this.state.event_content}
            />
            <p>What time should the event begin?</p>
            <TimePicker
              hintText="Select Time"
              keyboardFocused={true}
              value={this.state.event_content.start_time}
              defaultTime={this.state.default_day}
              onChange={this.handleStartTime}
            />
            <RaisedButton
              label={"back"}
              keyboardFocused={false}
              onTouchTap={()=>this.setStep(this.state.prior_step)}
            />
            <RaisedButton
              label={"next"}
              primary={true}
              onTouchTap={()=>this.setStep(this.setStep('switch_select'))}
            />
          </div>
        );
      case "recurring":
        return (
          <div>
            <EventTile 
              event_content={this.state.event_content}
            />
            <hr/>
            <p>Which Days will this repeat on? </p>
          </div>
        );
    }
  },

  render: function() {

    const actions = [
      <FlatButton
        label={this.state.close_label}
        primary={true}
        keyboardFocused={this.state.dialog_button_focused}
        onTouchTap={this.handleClose}
      />,
    ];

    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <RaisedButton label="Schedule New Event" onTouchTap={this.handleOpen}/>
        <Dialog
          title={this.state.dialog_title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          contentStyle={customContentStyle}
        >
          <div>{this.getStepContent(this.state.step)}</div>
        </Dialog>
      </div>
    )
  }
})