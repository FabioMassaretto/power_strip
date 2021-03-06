import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import $ from 'jquery';

import EventTile from './EventTile.jsx';
import DialogScreen from './DialogScreen.jsx'

const IntlPolyfill = require('intl');
var DateTimeFormat = global.Intl.DateTimeFormat || IntlPolyfill.DateTimeFormat;


const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};

export default React.createClass({

  getInitialState : function getInitialState(){
    var default_day = this.getDefaultDay();
    return {
      open: false,
      default_day: default_day,
      dialog_title:"Schedule an Event",
      step:'switch_select',
      next_step: "decide_recurring",
      prior_step: null,
      close_label: 'cancel',
      dialog_button_focused: false,
      event_content: {
        selected_switches: [],
        selected_day: default_day,
        start_time: null,
        stop_time: null,
      }
    };
  },

  handleOpen : function handleOpen(){
    this.setState({open: true});
  },

  handleClose : function handleClose(){
    this.resetState();
    this.setState({open:false});
  },

  getDefaultDay: function getDefaultDay(){
    var default_day = new Date();
    
    if (default_day.getHours()>=12) {
      default_day.setHours(12,0,0,0);
    } else {
      default_day.setHours(0,0,0,0);
    }
    return default_day;
  },

  resetState : function resetState(){
   var default_day = this.getDefaultDay();

    this.setState({
      default_day: default_day,
      dialog_title:"Schedule an Event",
      step:'switch_select',
      next_step: "decide_recurring",
      prior_step: null,
      close_label: 'cancel',
      dialog_button_focused: false,
      event_content: {
        selected_switches: [],
        selected_day: default_day,
        start_time: null,
        stop_time: null,
      }
    });
  },

  handleEventSubmit: function handleEventSubmit(){
    var weekDays = this.state.event_content.weekDays;
    var selected_day = this.state.event_content.selected_day;
    var start_time = this.state.event_content.start_time;
    var stop_time = this.state.event_content.stop_time;
    var selected_switches = this.state.event_content.selected_switches;
    var submittedEvent;

    if (this.state.event_content.selected_switches.length > 0){
      if (this.state.event_content.event_type === "single"){
        if (this.state.event_content.selected_day){
          if (this.state.event_content.start_time || this.state.event_content.stop_time){
            this.setState({open:false});

            if (start_time){
              var start_date = new Date(selected_day.getFullYear(), selected_day.getMonth(), selected_day.getDate(), start_time.getHours(), start_time.getMinutes())
            }
            if (stop_time){
              var stop_date = new Date(selected_day.getFullYear(), selected_day.getMonth(), selected_day.getDate(), stop_time.getHours(), stop_time.getMinutes())
            }

            submittedEvent = {
              event: {
                start_date: start_date || null,
                stop_date: stop_date || null,
                switches: selected_switches || null
              }
            }
          }
        }
      }
      else {
        this.setState({open:false});

        submittedEvent = {
          event: {
            start_date: start_time || null,
            stop_date: stop_time || null,
            switches: selected_switches || null,
            weekDays: weekDays
          }
        }

      }


      $.post( '/api/events', submittedEvent, function( data ) {
        console.log(data);
      });

      this.resetState();
    }
  },

  handleStartTime: function handleStartTime(event, date){
    this.updateEventContent("start_time", date);
  },

  handleStopTime: function handleStopTime(event, date){
    this.updateEventContent("stop_time", date);
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
  
  decideRecurring: function decideRecurring(input){
    this.state.event_content.event_type = input;
    
    var next = (input === "single") ? "single_date" : "recurring_days";

    this.handleStep(next);
  },

  addToSelectedSwitches: function addToSelectedSwitches(added_switch){
    var switchState = [];
    for (var i=0;i<this.state.event_content.selected_switches.length;i++){
      switchState.push(this.state.event_content.selected_switches[i]);
    }
    switchState.push(added_switch)

    this.updateEventContent('selected_switches', switchState);
  },

  removeFromSelectedSwitches: function removeFromSelectedSwitches(removed_switch){
    var switchState = [];
    for (var i=0;i<this.state.event_content.selected_switches.length;i++){
      switchState.push(this.state.event_content.selected_switches[i]);
    }
    var updatedSwitches = switchState.splice(switchState.indexOf(removed_switch), 1);

    this.updateEventContent('selected_switches', updatedSwitches);
  },

  addToSelectedDays: function addToSelectedDays(added_day){
    var dayState = [];
    for (var i=0;i<this.state.event_content.weekDays.length;i++){
      dayState.push(this.state.event_content.weekDays[i]);
    }
    dayState.push(added_day)

    this.updateEventContent('weekDays', dayState);
  },

  removeFromSelectedDays: function removeFromSelectedDays(removed_day){
    var dayState = [];
    for (var i=0;i<this.state.event_content.weekDays.length;i++){
      dayState.push(this.state.event_content.weekDays[i]);
    }
    var updatedDays = dayState.splice(dayState.indexOf(removed_day), 1);

    this.updateEventContent('weekDays', updatedDays);
  },


  handleStep: function handleStep(input){

    var prior = this.state.step;

    switch (input){

      case "switch_select":
        if (this.state.event_content.event_type){
          return this.setState({
            step:"switch_select",
            prior_step: null,
            next_step: "decide_recurring",
            dialog_title: "Select Switches"
          })
        }

      case "decide_recurring":
        return this.setState({
            step:"decide_recurring", 
            prior_step:"switch_select",
            next_step: ( (this.state.event_content.event_type === "single") ? "single" : "recurring") || null,
            dialog_title: "Schedule an Event", 
          }
        );

      // Single Event Branch 

      case "single_date":
        this.updateEventContent("event_type", "single")
        
        return this.setState({
          step:"single_date", 
          prior_step:"switch_select",
          next_step:"single_time",
          dialog_title:"Date Select", 
        });

      case 'single_time':
        return this.setState({
          step:"single_time",
          prior_step:"single_date",
          next_step:null,
          dialog_title:"Time Select"
        });

      // Recurring Event Branch
      case "recurring_days":
        this.updateEventContent("event_type", "recurring")
        if (!this.state.event_content.weekDays) {
          this.updateEventContent("weekDays", [])
        }
        return this.setState({
            step:"recurring_days", 
            prior_step:"switch_select",
            next_step:"recurring_time",
            dialog_title:"Days Select", 
           }
        );

      case "recurring_time":
        return this.setState({
          step:"recurring_time",
          prior_step:"recurring_days",
          next_step: null,
          dialog_title:"Time Select"
        })

      
    }
  },

  getStepContent: function getStepContent(step){
    var style = {
      margin: 12,
    };

    switch(step){
      case "switch_select":
        return(
          <DialogScreen 
            default_day={this.state.default_day}
            prompt={"Which switches are this event for?"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            event_content={this.state.event_content}
            show_event_content={false}
            decideRecurring={false}
            handleStep={this.handleStep}
            back_disabled={true}
            use_stuff_selector={true}
            stuff_to_select={"switches"}
            addToSelectedSwitches={this.addToSelectedSwitches}
            removeFromSelectedSwitches={this.removeFromSelectedSwitches}
          />
        );

      case "decide_recurring":
        return(
          <DialogScreen 
            prompt={"Will your event be single, or recurring?"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            nextDiabled={this.state.event_content.event_type}
            handleStep={this.handleStep}
            event_content={this.state.event_content}
            decideRecurring={this.decideRecurring}
          />
        );

      // Single Event Tree  
      case "single_date":
        return (
          <DialogScreen 
            pickerType="DatePicker"
            default_day={this.state.default_day}
            prompt={"What day will the event occur?"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            event_content={this.state.event_content}
            show_event_content={true}
            handleSelectDate={this.handleSelectDate}
            handleStep={this.handleStep}
          />
        );
      case "single_time":
        return (
          <DialogScreen 
            pickerType="TimePicker"
            default_day={this.state.default_day}
            prompt={"Add a time to turn the switch on or off"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            event_content={this.state.event_content}
            show_event_content={true}
            hide_next_button={true}
            handleStartTime={this.handleStartTime}
            handleStopTime={this.handleStopTime}
            handleStep={this.handleStep}
            handleEventSubmit={this.handleEventSubmit}
          />
        );

      // Recurring event tree
      case "recurring_days":
        return (
          <DialogScreen 
            prompt={"Which days should this event repeat on?"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            event_content={this.state.event_content}
            show_event_content={false}
            handleStep={this.handleStep}
            use_stuff_selector={true}
            stuff_to_select={"days"}
            addToSelectedDays={this.addToSelectedDays}
            removeFromSelectedDays={this.removeFromSelectedDays}
          />
        );
      case "recurring_time":
        return (
          <DialogScreen 
            pickerType="TimePicker"
            default_day={this.state.default_day}
            prompt={"Add a time to turn the switches on or off"}
            prior_step={this.state.prior_step}
            next_step={this.state.next_step}
            event_content={this.state.event_content}
            show_event_content={true}
            hide_next_button={true}
            handleStartTime={this.handleStartTime}
            handleStopTime={this.handleStopTime}
            handleStep={this.handleStep}
            handleEventSubmit={this.handleEventSubmit}
          />
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