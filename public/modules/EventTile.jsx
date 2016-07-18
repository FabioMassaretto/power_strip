import React from 'react';

const IntlPolyfill = require('intl');
var  DateTimeFormat = IntlPolyfill.DateTimeFormat;


export default React.createClass({
  
  formatDay: function formatDay(){
    var options = {
      month:"long",
      day:"numeric",
      year:"numeric"
    }
    
    var formatted = new Intl.DateTimeFormat('en-US', options).format(this.props.event_content.selected_day)
    return formatted;
  },

  checkStart: function checkStart(){
      return (
        <div className="eventContent">
          {"Turn on at: " + this.props.event_content.start_date}
        </div>
      )
    
  },

  render: function(){
    return (
      <div>
        <div className="eventContent">{"Day for event: " + this.formatDay()}</div>
        <p>{this.props.event_content.start_date}</p>
        <p>{this.props.event_content.stop_date}</p>
        <p>{this.props.event_content.switches[0]}</p>
      </div>
    )
  }
})