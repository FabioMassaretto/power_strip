const PythonShell = require('python-shell');
const fs = require('fs');
const jade = require('jade');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

var jsonParser = bodyParser.json();

var status = {lamp: 'off', heater: 'off'};


PythonShell.run('./public/python/scripts/sw1_off.py', function (err) {
  if (err) throw err;
});
PythonShell.run('./public/python/scripts/sw2_off.py', function (err) {
  if (err) throw err;
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.render('index', {data: status});
})

app.get('/api')


app.listen(3000, function(){
  console.log('Listening on port 3000');
})
