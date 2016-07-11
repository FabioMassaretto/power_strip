import React from 'react'
import Switch from './Switch.jsx'

export default React.createClass({

  componentWillMount: function componentWillMount() {
    
  },

  render(){
    if (this.props.switches){
      var switchStates = this.props.switches.map((v,i)=>{
        return (
          <div className="switch" key={i}>
            <Switch
              id={v.id}
              name={v.name}
              number={i + 1}
              state={v.state}
              showInput={false}
              toggleSwitch={this.props.toggleSwitch}
              changeName={this.props.changeName}
              nameInput={function(){this.props.showInput = true; }.bind(this)}
            />
          </div>
        )
      })
    }
    return (
      <div className="HomeScreen">
        <h1>Power Strip</h1>
        {switchStates}
      </div>
    )
  }
})