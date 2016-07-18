import React from 'react'
import EventTile from './EventTile.jsx'

export default React.createClass({

  render: function(){
    if (this.props.events){
      var eventList = this.props.events.map((v,i)=>{
        return (
          <div className="switch" key={i}>
            <EventTile 
              event_content={v}
            />
          </div>
        )
      })
    }
    return (
      <div>
        {eventList || "No Scheduled Events"}
      </div>
    );
  }
})