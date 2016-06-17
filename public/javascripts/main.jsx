var StripClient = React.createClass({
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
      }.bind(this)
    )
  },

  render: function(){
    if (this.state.switches){
      var switchStates = this.state.switches.map((v,i)=>{
        return (
          <div className="switch" key={i}>
            <Switch
              id={v.id}
              number={i + 1}
              state={v.state}
              toggleSwitch={this.toggleSwitch}
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
    return (
      <div>
        <h4>Switch #{this.props.number}</h4>
          <p>{this.props.state === "on" ? "Switch is ON" : "Switch is OFF"}</p>
          <button 
            type="button"
            onClick={()=>{this.props.toggleSwitch(this.props.id)}} 
          >Toggle
          </button>
      </div>
    )
  }
});

ReactDOM.render(
  React.createElement(StripClient, null),
  document.getElementById('strip')
);