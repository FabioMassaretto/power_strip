import React from 'react'
import Switch from './Switch.jsx'

export default React.createClass({
  
  render(){
    var id = this.props.params.id;
    var currSwitch = this.props.switches.filter(val =>{
      return val.id === id;
    })[0];

    return (
      <div>
        <h1>{currSwitch.name}</h1>
        <Switch
          id={id}
          state={currSwitch.state}
          toggleSwitch={this.props.toggleSwitch}
        />
      </div>
    )
  }

})