import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


export default React.createClass({
  render: function() {

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <CustomDialog
          currSwitch={this.props.currSwitch}
        />
      </MuiThemeProvider>  
    );
  }
})

var CustomDialog = React.createClass({
  getInitialState : function getInitialState(){
    return {
      open: false,
      stepIndex: 0,
      start_time: null,
      stop_time: null,
      selected_day: null,
    }
  },

  // Dialog open and close
  handleOpen : function handleOpen(){
    this.setState({open: true});
  },

  handleClose : function handleClose(){
    this.setState({open:false});
  },


  // Handle Stepper Rendering
  handleNext : function handleNext (){
    if (this.state.stepIndex < 2) {
      this.setState({stepIndex: this.state.stepIndex + 1});
    }
  },

  handlePrev : function handlePrev (){
    if (this.state.stepIndex > 0) {
      this.setState({stepIndex: this.state.stepIndex - 1});
    }
  },

  setStep: function setStep(newIndex){
    if (newIndex > -1 && newIndex <= 2){
      this.setState({stepIndex: newIndex})
    }
  },

  // Handle Time and Date State
  handleStartTime: function handleStartTime(event, date){
    this.setState({start_time: date});
  },

  handleStopTime: function handleStopTime(event, date){
    this.setState({stop_time: date});
  },

  handleSelectDate: function handleSelectDate(event, date){
    this.setState({selected_day: date})
  },

  getStepContent: function (stepIndex) {
      switch (stepIndex) {
        case 0:
          return (
            <div>
              <p>Choose the day for this activity</p>
              <DatePicker 
                hintText="Start Day"
                value={this.state.selected_day}
                onChange={this.handleSelectDate}
              />
            </div>
          );
        case 1:
          return (
            <div>
              <p>What time should the outlet turn on?</p>
              <TimePicker
                format="ampm"
                hintText="12hr Format"
                value={this.state.start_time}
                onChange={this.handleStartTime}
              />
            </div>
          );
        case 2:
          return (
            <div>
              <p>What time should the outlet turn off?</p>
              <TimePicker
                format="ampm"
                hintText="12hr Format"
                value={this.state.stop_time}
                onChange={this.handleStopTime}
              />
            </div>
          );
      }
  },

  render: function(){

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div style={{width: '100%', margin: 'auto'}}>
        <RaisedButton label="Schedule New Event" onTouchTap={this.handleOpen} />
        <Dialog
          title={"New Event For " + this.props.currSwitch.name}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <Stepper linear={false} activeStep={this.state.stepIndex}>
            <Step>
              <StepButton onClick={()=>this.setStep(0)}> 
                Select a day
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={()=>this.setStep(1)}>
                Time on
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={()=>this.setStep(2)}>
                Time off
              </StepButton>
            </Step>
          </Stepper>
          <div>
            <div>{this.getStepContent(this.state.stepIndex)}</div>
            <div style={{marginTop:12}}>
              <FlatButton
                label="Back"
                disabled={this.state.stepIndex === 0}
                onTouchTap={this.handlePrev}
                style={{marginRight: 12}}
              />
              <RaisedButton
                label="Next"
                disabled={this.state.stepIndex === 2}
                primary={true}
                onTouchTap={this.handleNext}
              />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
  
})