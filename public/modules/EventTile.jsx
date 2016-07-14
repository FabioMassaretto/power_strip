import React from 'react';



export default React.createClass({
  render: function(){
    return (
      <div className="eventTile">
        <p>Event type:</p>
        {this.props.content}
      </div>
    )
  }
})