require('dotenv').config();

const PythonShell = require('python-shell');
const fs = require('fs');
const schedule = require('node-schedule');
const express = require('express');
const bodyParser= require('body-parser');
const path = require('path')
const app = express();

// Information held in server memory
const state = [];
const eventQueue = [];
const pendingEvents = {};
var uniqueEvents = 0;

// makes sure that name and state are 
function saveState (){
  var parsed = JSON.parse(data);

  for (i=0;i<state.length;i++){
    if(parsed.switches[i]) parsed.switches[i].name = state[i].name;
    if(parsed.switches[i]) parsed.switches[i].state = state[i].state;

  }

  var formattedState = {
    switches: parsed.switches,
    events: eventQueue,
    uniqueEvents: uniqueEvents
  }


  fs.writeFile('./saveState.json', JSON.stringify(formattedState) )
}



// Create switch objects for the state
function init(){
  for (i=1;i<=5;i++){
    state.push(new Switch(i));
  }
  for (i=1;i<=5;i++){
    var str = offString(i);
    PythonShell.run(str, function (err) {
      if (!process.env.DEV){
        if (err) throw err;
      } 
    });
  }
  
}

// Update switch objects in state with saved data
var readableStream = fs.createReadStream('saveState.json');
var data = ''

readableStream.on('data', function(chunk) {
    data+=chunk;
});


readableStream.on('end', function() {
  var parsed = JSON.parse(data);
  uniqueEvents = parsed.uniqueEvents;

  for (i=0; i<parsed.events.length;i++){
    if (parsed.events[i].start_date){
      var checkDate = new Date(parsed.events[i].start_date); 
      var now = new Date();
      if (checkDate > now){
        scheduleEvent(parsed.events[i]);
        
        var foundSwitch = getSwitch(parsed.events[i].switchId);
        var checkedEvent = new Event(parsed.events[i], foundSwitch);

        eventQueue.push(parsed.events[i]);
      }
    }
  }

  for (i=0;i<state.length;i++){
    if(parsed.switches[i].name) state[i].name = parsed.switches[i].name;
    
    if(parsed.switches[i].state) {
      state[i].state = parsed.switches[i].state;
      
      var str = state[i].state === "on" ? onString(i) : offString(i);
      PythonShell.run(str, function (err) {
        if (!process.env.DEV){
          if (err) throw err;
        } 
      });
    }

  }
});



// needed due to a quirk with PythonShell
function onString(number){
  return './public/python/scripts/sw' + number + '_on.py'
}
function offString(number){
  return './public/python/scripts/sw' + number + '_off.py'
}



function getSwitch(string){
  return state.filter(function(element){
    return element.id === string;
  })[0]
}


// Switch constructor
function Switch(number){
  this.id = 'sw' + number
  this.state = "off"
  this.name = "Switch #" + number
  this.toggle = function(){
    if (this.state === "off"){
      var str = onString(this.id[2]);
      PythonShell.run(str, function (err) {
        if (!process.env.DEV){
          if (err) throw err;
        } 
      });
      this.state = "on"
    }
    else {
      var str = offString(this.id[2]);
      PythonShell.run(str, function (err) {
        if (!process.env.DEV){
          if (err) throw err;
        } 
      });
      this.state = "off"
    }
  }
}

// Event constructor
function Event(eventObject, foundSwitch){
  this.id = uniqueEvents;
  this.switchId = foundSwitch.id;

  uniqueEvents ++;

  if (eventObject.start_date){
    this.start_date = {
      date: eventObject.start_date,
      switchId: foundSwitch.id,
    };
  }

  if (eventObject.stop_date){
    this.stop_date = {
      date: eventObject.stop_date,
      switchId: foundSwitch.id,
    };
  }
}

function scheduleEvent(eventObject){
  var foundSwitch = getSwitch(eventObject.switchId);
  pendingEvents[eventObject.id] = {};



  if (eventObject.start_date){
    var start_date = new Date(eventObject.start_date.date);

  

    var job = schedule.scheduleJob(start_date, function(){
      if(foundSwitch.state === "off"){ 
        foundSwitch.toggle();
        saveState();
      }
    });

    pendingEvents[eventObject.id].on = job;


    pendingEvents[eventObject.id].cancelOn = function(){
      pendingEvents[eventObject.id].on.cancel();
    }

  }

  if (eventObject.stop_date){
    var stop_date = new Date(eventObject.stop_date.date);
 

    var j = schedule.scheduleJob(stop_date, function(){
      if(foundSwitch.state === "on"){ 
        foundSwitch.toggle();
        saveState();
      }
    });

    pendingEvents[eventObject.id].off = j;

    pendingEvents[eventObject.id].cancelOff = function(){
      pendingEvents[eventObject.id].off.cancel();
    }
  }
}


app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index');
})

app.get('/api/switches', function(req, res){
  res.send(state);
})

app.get('/api/switches/:id', function(req, res){
  var found = getSwitch(req.params.id);
  res.json(found)
})

app.post('/api/switches/:id', function(req, res){
  var foundSwitch = getSwitch(req.params.id);

  if (req.body.event){
    var newEvent = new Event(req.body.event, foundSwitch);
    scheduleEvent(newEvent);
    eventQueue.push(newEvent);

    saveState();
    res.json(newEvent);

  }
  else {
    foundSwitch.toggle();
    saveState();
    res.json(foundSwitch)
  }
})


app.get('*', function (req, res){
  res.redirect('/');
})


new Promise(function(resolve,reject){init()})
  .then(
    app.listen(process.env.PORT, function(){
     console.log('Listening on port ' + process.env.PORT);
    })
  )


