require('dotenv').config();

const PythonShell = require('python-shell');
const fs = require('fs');
const schedule = require('node-schedule');
const express = require('express');
const bodyParser= require('body-parser');
const path = require('path')
const app = express();
const Switch = require('./js/Switch.js');
const Event = require('./js/Event.js');

// Information held in server memory
const switches = [];
const events = [];

// makes sure that name and state are 
function saveState (){

  var formattedState = {
    switches: switches,
    events: events,
    uniqueEvents: Event.uniqueEvents
  }


  fs.writeFile('./saveState.json', JSON.stringify(formattedState) )
}

// Update switch objects in state with saved data
var readableStream = fs.createReadStream('saveState.json');
var data = ''

readableStream.on('data', function(chunk) {
    data+=chunk;
});


readableStream.on('end', function() {
  var parsed = JSON.parse(data);
  Event.uniqueEvents = parsed.uniqueEvents;

  for (i=0;i<parsed.switches.length;i++){
    switches.push(new Switch(parsed.switches[i]))
  }

  for (i=0;i<parsed.events.length;i++){
    events.push(new Event(parsed.events[i]))
  }
});

function getSwitch(string){
  return switches.filter(function(element){
    return element.id === string;
  })[0]
}

function getEvent(string){
  return events.filter(function(event){
    return event.id == string;
  })[0]
}


// Server Configuration
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/public'));




// Switch Routes for API
app.get('/api/switches', function(req, res){
  res.send(switches);
})

app.get('/api/switches/:id', function(req, res){
  var found = getSwitch(req.params.id);
  res.json(found);
})

app.post('/api/switches/:id', function(req, res){
  var foundSwitch = getSwitch(req.params.id);
  foundSwitch.toggle();
  saveState();
  console.log("postSwitch "+JSON.stringify(foundSwitch));
  res.json(foundSwitch);
})

// Event Routes
app.get('/api/events', function(req, res){
  res.send(events);
})

app.get('/api/events/:id', function(req,res){
  var foundEvent = getEvent(req.params.id);
  res.json(foundEvent);
})

app.post('/api/events', function(req, res){
    var newEvent = new Event(req.body.event, getSwitch);
    
    events.push(newEvent);
    saveState();
    res.json(newEvent);
})


app.get('*', function (req, res){
  res.redirect('/');
})


app.listen(process.env.PORT, function(){
 console.log('Listening on port ' + process.env.PORT);
})



