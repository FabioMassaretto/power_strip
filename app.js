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

  // var verifiedEvents = [];
  // for (i=0;i<eventQueue.length;i++){
  //   verifiedEvents.push(eventQueue[i]);
  // }
  
  // var now = new Date()
  // for (i=0;i<verifiedEvents.length;i++){
  //   if (verifiedEvents[i]){
  //     if (!verifiedEvents[i].recurring){
  //       if (verifiedEvents[i].start_date){
  //         var checkDate = new Date(verifiedEvents[i].start_date); 
  //         if (checkDate < now){
  //           eventQueue.splice(eventQueue.indexOf(verifiedEvents[i]), 1)
  //         }
  //       } else if (verifiedEvents[i].stop_date){
  //         var checkDate = new Date(verifiedEvents[i].stop_date);
  //         if (checkDate < now){
  //           eventQueue.splice(eventQueue.indexOf(verifiedEvents[i]), 1)
  //         }
  //       }
  //     } 
  //   }
  // }


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

// function getDayNumber(string){
//   switch(string){
//     case "Sunday":
//       return 0;
//     case "Monday":
//       return 1;
//     case "Tuesday":
//       return 2;
//     case "Wednesday":
//       return 3;
//     case "Thursday":
//       return 4;
//     case "Friday":
//       return 5;
//     case "Saturday":
//       return 6;
//   }
// }


// function scheduleRecurringEvent(eventObject){
//   if (eventObject){
//     pendingEvents[eventObject.id] = {};

//     if (eventObject.start_date){
//       var start_date = new Date(eventObject.start_date);
//         var weekDays = [];
//         for (i=0;i<eventObject.weekDays.length;i++){
//           weekDays.push(getDayNumber(eventObject.weekDays[i]));  
//         }
//         var rule = new schedule.RecurrenceRule();
//         rule.hour = start_date.getHours();
//         rule.minute = start_date.getMinutes();
//         rule.dayOfWeek = weekDays;


//         scheduleOn(rule, eventObject);
//     }
    
//     if (eventObject.stop_date){
//       var stop_date = new Date(eventObject.start_date);
//       var weekDays = [];
//       for (i=0;i<eventObject.weekDays.length;i++){
//         weekDays.push(getDayNumber(eventObject.weekDays[i]));
//       }
//         var rule = new schedule.RecurrenceRule();
//         rule.hour = stop_date.getHours();
//         rule.minute = stop_date.getMinutes();
//         rule.dayOfWeek = weekDays;

//         scheduleOff(rule, eventObject);

//     }

//     eventQueue.push(eventObject)
//   }

// }


// Server Configuration
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname + '/public'));


// Serves the React view
app.get('/', function(req, res){
  res.sendFile('index');
})


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


new Promise(function(resolve,reject){init()})
  .then(
    app.listen(process.env.PORT, function(){
     console.log('Listening on port ' + process.env.PORT);
    })
  )


