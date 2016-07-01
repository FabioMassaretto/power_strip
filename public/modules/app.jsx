import React from 'react'
import $ from 'jquery'

export default React.createClass({
  displayName: 'StripClient',

  getInitialState : function getInitialState() {
      return {
          switches : []  
      };
  },

  componentWillMount: function componentWillMount() {
    $.getJSON("/api/switches").then((function (switches) {
      this.setState({
        switches: switches
      });
    }).bind(this));
  },

//ID is formatted as "sw1"
  toggleSwitch: function toggleSwitch(id) {
    var route = "/api/switches/" + id;
    $.post(route).then((data)=>{
      this.state.switches[id[2] - 1] = data;
      this.setState({
           switches: this.state.switches
        });
        console.log(this.state.switches)
      }
    ).bind(this)
  },

  changeName: function changeName(id, name){
    var route = "/api/switches/" + id + "/name";
    $.post(route, name).then((data)=>{
      this.state.switches[id[2] - 1] = data;
      this.setState({
        switches: this.state.switches
      });
      console.log(this.state.switches)
    }).bind(this)
  },

  render: function(){
    if (this.state.switches){
      var switchStates = this.state.switches.map((v,i)=>{
        return (
          <div className="switch" key={i}>
            <Switch
              id={v.id}
              name={v.name}
              number={i + 1}
              state={v.state}
              showInput={false}
              toggleSwitch={this.toggleSwitch}
              changeName={this.changeName}
              nameInput={function(){this.showInput = true; }.bind(this)}
            />
          </div>
        )
      })
    }
    return (
      <div className="container">
        <h1>Power Strip</h1>
        {switchStates}
      </div>
    )
    

  }
});

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
