import React from 'react';

const IntlPolyfill = require('intl');
var  DateTimeFormat = IntlPolyfill.DateTimeFormat;


export default React.createClass({
  
  // revealContent: function revealContent(reveal){
  //   switch(reveal){
  //     case "none":
  //       return (
  //         <div></div>
  //       );
  //     case "event_type":
  //       return (
  //         <div>
  //           <p>{"Event type: " + this.props.content.event_type}</p>
  //         </div>
  //       );
  //     case "date":
  //       return (
  //         <div>
  //           <p>{"Event type: " + this.props.content.event_type}</p>
  //           <p>{"Day for event: " + this.props.content.selected_date}</p>
  //         </div>
  //       );
  //   }
  // },
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
    if (this.props.event_content.start_time){
      return (
        <div className="eventContent">
          {"Turn on at: " + this.props.event_content.start_time}
        </div>
      )
    }
  },

  render: function(){
    return (
      <div>
        <div className="eventContent">{"Event type: " + this.props.event_content.event_type}</div>
        <div className="eventContent">{"Day for event: " + this.formatDay()}</div>
        {()=>this.checkStart()}
      </div>
    )
  }
})