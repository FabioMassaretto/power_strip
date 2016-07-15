import React from 'react';
import Checkbox from 'material-ui/Checkbox';

export default React.createClass({
  
  chooseSwitches: function chooseSwitches(){
    if (this.props.stuff === "switches"){
      return ['sw1', 'sw2', 'sw3', 'sw4', 'sw5']
    }
    else {
      return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    }
  },

  isThisChecked: function isThisChecked(label){
    if (this.props.event_content){
      if (this.props.event_content.selected_switches){
        if (this.props.event_content.selected_switches.indexOf(label) > -1){
          return true;
        }
      }
      else if (this.props.event_content.weekDays){
        if (this.props.event_content.weekDays.indexOf(label) > -1){
          return true;
        }
      }
      else return false;
    }
    return false;
  },

  handleCheck: function handleCheck(label){
    if (this.props.stuff === "switches"){
      if (this.props.event_content.selected_switches.indexOf(label) > -1){
        this.props.removeFromSelectedSwitches(label)
      }
      else this.props.addToSelectedSwitches(label)
    }
  },

  render: function(){
    var selectOptions = this.chooseSwitches().map((v,i)=>{
      return (
        <div className="switch" key={i}>
          <Checkbox 
            label={v}
            onCheck={()=>this.handleCheck(v)}
          />
        </div>
      )
    })
    return (
      <div>
        {selectOptions}
      </div>
    );
  }
})