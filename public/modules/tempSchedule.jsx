import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import $ from 'jquery';

import EventTile from './EventTile.jsx';


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

export default React.createClass({

  getInitialState : function getInitialState(){
    return {
      open: false,
      dialog_title:"Schedule an Event",
      step:'start',
      prior_step: null,
      start_time: null,
      stop_time: null,
      selected_day: null,
      close_label: 'cancel',
      dialog_button_focused: false,
      event_content: {}
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
    var selected_day = this.state.selected_day;
    var start_time = this.state.start_time;
    var stop_time = this.state.stop_time;

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
    this.setState({start_time: date});
  },

  handleStopTime: function handleStopTime(event, date){
    this.setState({stop_time: date});
  },

  handleSelectDate: function handleSelectDate(event, date){
    this.setState({selected_day: date})
  },

  setStep: function setStep(input){
    switch (input){
      case "single":
        return this.setState({step:"single", prior_step:"start", dialog_title:"Single Event"});
      case "recurring":
        return this.setState({step:"recurring", prior_step:"start", dialog_title:"Recurring Event"});
      case "start":
        return this.setState({step:"start", prior_step:null, dialog_title:"Schedule an Event"});
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
            <RaisedButton label="Single" style={style} onTouchTap={()=>this.setStep('single')}/>
            <RaisedButton label="Recurring" style={style} onTouchTap={()=>this.setStep('recurring')}/>
          </div>
        );
      case "single":
        return (
          <div>
            <EventTile content={this.props.event_content}/>
            <hr/>
            <p>What day will the event occur?</p>
            <DatePicker 
              hintText="Start Day"
              value={this.state.selected_day}
              onChange={this.handleSelectDate}
            />
          </div>
        );
      case "recurring":
        return (
          <div>
            <EventTile content={this.props.event_content}/>
            <hr/>
            <p>Which Days will this repeat on? </p>
          </div>
        );
    }
  },

  render: function() {

    const actions = [
      <FlatButton
        label={"back"}
        disabled={!this.state.prior_step}
        keyboardFocused={false}
        onTouchTap={()=>this.setStep(this.state.prior_step)}
      />,
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