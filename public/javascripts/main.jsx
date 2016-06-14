var StripClient = React.createClass({displayName: 'StripClient',
  render: function(){
    return (
      <div>
        <h1>Power Strip</h1>
        <Switch></Switch>
      </div>
    )
  }
});

var Switch = React.createClass({displayName: 'Switch',
  render: function(){
    return (
      <div>
        <button>Ima button</button>
      </div>
    )
  }
});

ReactDOM.render(
  React.createElement(StripClient, null),
  document.getElementById('strip')
);