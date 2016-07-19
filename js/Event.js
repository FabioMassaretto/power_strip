function Event(eventObject){
  var uniqueEvents = 0;

  this.id = uniqueEvents;
  this.switches = eventObject.switches;
  this.recurring = null;

  if (eventObject.weekDays){
    this.recurring = true;
    this.weekDays = [];
    for (i=0;i<eventObject.weekDays.length;i++){
      this.weekDays.push(eventObject.weekDays[i]);
    }
  } else this.recurring = false;

  uniqueEvents ++;

  if (eventObject.start_date){
    this.start_date = eventObject.start_date
  };

  if (eventObject.stop_date){
    this.stop_date = eventObject.stop_date
  }
}



module.exports = Event;