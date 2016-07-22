import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import EventTile from './EventTile.jsx';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import StuffSelector from './StuffSelector.jsx'

/* Expected Props:
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

  getInitialState: function getInitialState(){
    return {
      selectValue: "on",
      submitReady: false
    }
  },

  componentDidMount: function componentDidMount(){
    this.handleTime()
  },

  handleSelectChange: function handleSelectChange(){
    ( this.state.selectValue === "on" ) ? this.setState({selectValue: "off"}) : this.setState({selectValue: "on"})
  },

  handleTime: function handleTime(){
    ( this.state.selectValue === "on" ) ? ()=>this.props.handleStartTime() : ()=>this.props.handleStopTime()
  },

  checkTimeValue: function checkTimeValue(){
    if (this.state.selectValue === "on"){
      return this.props.event_content.start_time;
    }
    else {
      return this.props.event_content.stop_time;
    }
  },

  showPicker: function showPicker(){
    switch(this.props.pickerType){
      case "TimePicker":
        if (this.state.selectValue === "on"){
          return (
            <div>
              <p>Turn selected switches </p>
              <SelectField value={this.state.selectValue} onChange={this.handleSelectChange}>
                <MenuItem value={'on'} primaryText="on" />
                <MenuItem value={'off'} primaryText="off" />
              </SelectField>
              <p>at time: </p>
              <TimePicker 
                hintText="Select Time"
                value={this.props.event_content.start_time}
                defaultTime={this.props.default_day}
                onChange={this.props.handleStartTime}
              />
            </div>
          );
        } else {
          return (
            <div>
              <p>Turn selected switches </p>
              <SelectField value={this.state.selectValue} onChange={this.handleSelectChange}>
                <MenuItem value={'on'} primaryText="on" />
                <MenuItem value={'off'} primaryText="off" />
              </SelectField>
              <p>at time: </p>
              <TimePicker 
                hintText="Select Time"
                value={this.props.event_content.stop_time}
                defaultTime={this.props.default_day}
                onChange={this.props.handleStopTime}
              />
            </div>
          );
        }
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
          onTouchTap={()=>{
            console.log(this.props.prior_step)
            this.props.handleStep(this.props.prior_step)
          }}
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
    else {
      return (
        <RaisedButton 
          label="Submit!"
          primary={true}
          onTouchTap={()=>this.props.handleEventSubmit()}
          keyboardFocused={this.state.submitReady}
        />
      );
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

  showStuffSelector: function showStuffSelector(){
    if (this.props.use_stuff_selector){
      if (this.props.stuff_to_select === "switches") {
        return (
          <StuffSelector 
            stuff={this.props.stuff_to_select}
            event_content={this.props.event_content}
            addToSelectedSwitches={this.props.addToSelectedSwitches}
            removeFromSelectedSwitches={this.props.removeFromSelectedSwitches}
          />
        );
      }
      else return (
        <StuffSelector 
          stuff={this.props.stuff_to_select}
          event_content={this.props.event_content}
          addToSelectedDays={this.props.addToSelectedDays}
          removeFromSelectedDays={this.props.removeFromSelectedDays}
        />
      );
    }
  },

  render: function(){
    return (
      <div>
        { this.showEventContent() }
        <p>{this.props.prompt}</p>
        { this.showPicker() }
        { this.showRecurringChoice() }
        { this.showStuffSelector() }
        { this.hideBackButton() }
        { this.hideNextButton() }
      </div>
    );
  }

})