import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import EventTile from './EventTile.jsx';

/*
Expected Props:
{
  pickerType: "TimePicker" || "DatePicker",
  default_day: Date Object,
  handleStartTime || handleStopTime || handleSelectDate,
  prompt: "text",
  prior_step: "text",
  next_step: "text",
  back_disabled: false by default,
  next_disabled: false by default,
  event_content: {
    selected_day: 
    start_time
    stop_time
  },
  
}


*/

const IntlPolyfill = require('intl');
var DateTimeFormat = global.Intl.DateTimeFormat || IntlPolyfill.DateTimeFormat;

export default React.createClass({

  showPicker: function showPicker(){
    switch(this.props.pickerType){
      case "TimePicker":
        if (this.props.handleStartTime){
          return (
            <TimePicker 
              hintText="Select Time"
              value={this.props.event_content.start_time}
              defaultTime={this.props.default_day}
              onChange={this.props.handleStartTime}
            />
          )
        }
        else return (
          <TimePicker 
            hintText="Select Time"
            value={this.props.event_content.stop_time}
            defaultTime={this.props.default_day}
            onChange={this.props.handleStopTime}
          />
        );
      case "DatePicker":
        return (
          <DatePicker 
            hintText="Start Day"
            value={this.props.event_content.selected_day}
            onChange={this.props.handleSelectDate}
            formatDate={new DateTimeFormat('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            }).format}
          />
        );
    }
  },

  showEventContent: function showEventContent(){
    if (this.props.show_event_content){
      return (
        <div>
          <EventTile event_content={this.props.event_content}/>
          <hr/>
        </div>
      )
    }
  },

  hideBackButton: function hideBackButton(){
    //default is to show
    if (!this.props.hide_back_button){
      return (
        <RaisedButton 
          label={"back"}
          onTouchTap={()=>this.props.handleStep(this.props.prior_step)}
          disabled={this.props.back_disabled}
        />
      )
    }
  },
  hideNextButton: function hideNextButton(){
    //default is to show
    if (!this.props.hide_next_button){
      return (
        <RaisedButton 
          label={"next"}
          primary={true}
          onTouchTap={()=>this.props.handleStep(this.props.next_step)}
          disabled={this.props.next_disabled}        
        />
      )
    }
  },

  showRecurringChoice: function showRecurringChoice(){
    if (this.props.decideRecurring){
      return (
        <div>
          <RaisedButton 
            label={"single"}
            onTouchTap={()=>this.props.decideRecurring("single")}
          />
          <RaisedButton 
            label={"recurring"}
            onTouchTap={()=>this.props.decideRecurring("recurring")}
          />
          <br/>
        </div>
      )
    }

  },

  render: function(){
    return (
      <div>
        { this.showEventContent() }
        <p>{this.props.prompt}</p>
        { this.showPicker() }
        { this.showRecurringChoice() }
        { this.hideBackButton() }
        { this.hideNextButton() }
      </div>
    );
  }

})