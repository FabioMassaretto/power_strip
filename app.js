require('dotenv').config();

const PythonShell = require('python-shell');
const fs = require('fs');
const schedule = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const Switch = require('./js/Switch.js');
const Event = require('./js/Event.js');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

// Information held in server memory
const events = [];
const messages = [];
var switches;
// makes sure that name and state are

var uri = process.env.DB_URI

var fetchSwitches = new Promise((resolve,reject) =>{
  if (switches) resolve (switches);

  MongoClient.connect(uri, function(err, db) {
    var switchCollection = db.collection('Switches');
    switchCollection.find().toArray(function(err, switchArray) {
      db.close();
      if(err) reject(err)
      else {
        switches = switchArray.map(each =>{
          return new Switch(each);
        });
        resolve(switches);
      }
    })
  });
})

function saveState() {}

//   var formattedState = {
//     switches: switches,
//     events: events,
//     uniqueEvents: Event.uniqueEvents
//   }

//   fs.writeFile('./saveState.json', JSON.stringify(formattedState))
// }

// // Update switch objects in state with saved data
// var readableStream = fs.createReadStream('saveState.json');
// var data = ''

// readableStream.on('data', function (chunk) {
//   data += chunk;
// });

// readableStream.on('end', function () {
//   var parsed = JSON.parse(data);
//   Event.uniqueEvents = parsed.uniqueEvents;

//   for (i = 0; i < parsed.switches.length; i++) {
//     switches.push(new Switch(parsed.switches[i]))
//   }

//   for (i = 0; i < parsed.events.length; i++) {
//     events.push(new Event(parsed.events[i]))
//   }
// });

async function getSwitch(string) {
  let switchArray = await fetchSwitches;
  return switches.filter((item)=>{
    return item['switch_num'] === string;
  })[0]
}

function getEvent(string) {
  return events.filter(function (event) {
    return event.id == string;
  })[0]
}

function passRequest(command, password, targetSwitches, req){
  for (let i=0; i<targetSwitches.length; i++){
    var currSwitch = targetSwitches[i];
    var id = currSwitch["switch_num"];
    var reducedId = "sw" + (Number(id.replace(/\D/g, '')) - 5)

    var options1 = {
      host: '10.0.1.5',
      port: 80,
      path: '/api/switches/' + id + "?password=" + process.env.PASS + "&&command=" + command,
      method: 'POST'
    };
    var options2 = {
      host: '10.0.1.4',
      port: 80,
      path: '/api/switches/' + reducedId + "?password=" + process.env.PASS + "&&command=" + command,
      method: 'POST'
    };

    if (Number(id[2]) <= 5) {
      var req = http.request(options1, function (res) {
        // console.log('STATUS: ' + res.statusCode); console.log('HEADERS: ' +
        // JSON.stringify(res.headers));
        res.setEncoding('utf8');
        // res.on('data', function (chunk) {   console.log('BODY: ' + chunk); });
      });
    } else if (Number(id[2]) > 5) {
      var req = http.request(options2, function (res) {
        // console.log('STATUS: ' + res.statusCode); console.log('HEADERS: ' +
        // JSON.stringify(res.headers));
        res.setEncoding('utf8');
        // res.on('data', function (chunk) {   console.log('BODY: ' + chunk); });
      });
    }

    req
      .on('error', function (e) {
        console.log('problem with request: ' + e.message);
      });
    req.end();

    if (command === "on") {
      currSwitch.setState(command);
    } else if (command === "off") {
      currSwitch.setState(command);
    } else {
      currSwitch.toggle();
    }
    console.log("postSwitch " + JSON.stringify(currSwitch));
  }
}



// Server Configuration
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(__dirname + '/public'));

// Serves the React view
app.get('/', function (req, res) {
  res.sendFile('index');
})

// Switch Routes for API
app.get('/api/switches', function (req, res) {
  fetchSwitches.then(switches=>{
    res.send(switches);
  })
})

app.get('/api/switches/:id', function (req, res) {
  getSwitch(req.params.id).then(foundSwitch=>{
    res.send(foundSwitch);
  })
})

app.post('/api/switches/all', function (req, res) {
  var command = req.query.command;
  var password = req.query.password;
  passRequest(command, password, switches, req);
  res.json(switches);
   saveState();
})

app.post('/api/switches/lights', function (req, res) {
  var lightIds = ["sw1", "sw7"];
  var lightSwitches = switches.filter((light)=>{
    return lightIds.indexOf(light.id) > -1;
  })
  var command = req.query.command;
  var password = req.query.password;
  passRequest(command, password, lightSwitches, req);
  res.json(switches);
  saveState();
})


app.post('/api/switches/:id', async function (req, res) {
  var command = req.query.command;
  var id = req.params.id;
  var password = req.query.password;
  var foundSwitch;
  await getSwitch(req.params.id).then(response=>{
    if (!command) {
      command = response.state === "off" ? "on" : "off";
    }
    foundSwitch = response;
  })
  await foundSwitch.setState(command).then(state=>{
    res.json(state);
  })
})



app.get('*', function (req, res) {
  res.redirect('/');
})

app.listen(process.env.PORT, function () {
  console.log('Listening on port ' + process.env.PORT);
})
