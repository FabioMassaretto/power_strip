import React from 'react'

export default React.createClass({
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
      <div>
        <h1>Power Strip</h1>
        {switchStates}
      </div>
    )
  }
})

var Switch = React.createClass({displayName: 'Switch',
  render: function(){
      if (this.props.showInput){
        return (
          <div>
            <input type="text"/>
              <a
                href="#" 
                id={this.props.id}
                className={"toggle " + (this.props.state === "on" ? "toggle--on" : "toggle--off")}
                onClick={()=>{this.props.toggleSwitch(this.props.id)}} 
              >
              </a>
          </div>
        )
      }
      else {
        return (
        <div>
          <h4
            onClick={()=>{this.props.nameInput()}}
          >{this.props.name}</h4>
            <a
              href="#" 
              id={this.props.id}
              className={"toggle " + (this.props.state === "on" ? "toggle--on" : "toggle--off")}
              onClick={()=>{this.props.toggleSwitch(this.props.id)}} 
            >
            </a>
        </div>
        )
      }
  }
});
