const schedule = require('node-schedule');

function Event(eventObject, getSwitch){
  var uniqueEvents = 0;

  this.id = uniqueEvents;
  this.switches = eventObject.switches;
  this.recurring = null;
  this.job = null;

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

  this.scheduleJob = function scheduleJob(rule, state){
    this.job = schedule.scheduleJob(rule, function(){
      for (i=0;i<this.switches.length;i++){
        var foundSwitch = getSwitch(this.switches[i]);
        foundSwitch.setState(state);
      }
    }.bind(this));
  }

  this.cancel = function(){
    this.job.cancel();
  }

  this.scheduleEvent = function scheduleEvent() {
    var state = (this.start_date) ? "on" : "off";
    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (this.recurring){
      var rule = new schedule.RecurrenceRule();
      rule.dayOfWeek = this.weekDays.map((val)=>{
        return val.indexOf(week)? val.indexOf(week) : 0;
      })
      if (this.start_date){

      }
      if (this.stop_date){
        rule.dayOfWeek = []
        rule.hour = stop_date.getHours();
        rule.minute = stop_date.getMinutes();
      }
      this.scheduleJob(rule, state);
    }
    else {
      if (this.start_date){
        var start_date = new Date(this.start_date);
        this.scheduleJob(start_date, state);
      }
      if (this.stop_date){
        var stop_date = new Date(this.stop_date);
        this.scheduleJob(stop_date, state);
      }

    }
  }
  this.scheduleEvent();
}



module.exports = Event;