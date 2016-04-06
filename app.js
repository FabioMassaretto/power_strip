const PythonShell = require('python-shell');
const fs = require('fs');
const jade = require('jade');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

var jsonParser = bodyParser.json();

var status = {lamp: 'off', heater: 'off'};


PythonShell.run('./public/python/sw1_off.py', function (err) {
  if (err) throw err;
});
PythonShell.run('./public/python/sw2_off.py', function (err) {
  if (err) throw err;
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', {data: status});
})

app.get('/json', function(req, res){
  res.send(JSON.stringify(status));
})

app.post('/lamp', jsonParser, function (req, res) {
  if (req.body.lamp === 'on'){
    status.lamp = 'on';
    PythonShell.run('./public/python/sw1_on.py', function (err) {
      if (err) throw err;
      console.log('lamp on');
    });
  }
  else if (req.body.lamp === 'off'){
    status.lamp = 'off';
    PythonShell.run('./public/python/sw1_off.py', function (err) {
      if (err) throw err;
      console.log('lamp off');
    });
  }
})

app.post('/heater', jsonParser, function (req, res) {
if (req.body.heater === 'on'){
    status.heater = 'on';
    PythonShell.run('./public/python/sw2_on.py', function (err) {
      if (err) throw err;
      console.log('heater on');
    });
  }
  else if (req.body.heater === 'off'){
    status.heater = 'off';
    PythonShell.run('./public/python/sw2_off.py', function (err) {
      if (err) throw err;
      console.log('heater off');
    });
  }
  // create user in req.body
})


app.listen(3000, function(){
  console.log('Listening on port 3000');
})
