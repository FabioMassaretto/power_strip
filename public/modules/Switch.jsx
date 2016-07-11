import React from 'react'

export default React.createClass({displayName: 'Switch',
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
