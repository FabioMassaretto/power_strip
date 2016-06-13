const PythonShell = require('python-shell');
const fs = require('fs');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

const state = {};

var jsonParser = bodyParser.json();

// Python Script Syntax

// PythonShell.run('./public/python/scripts/sw1_off.py', function (err) {
//   if (err) throw err;
// });


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile('index');
})

app.get('/api', function(req, res){
  res.send(state);
})


app.listen(3000, function(){
  console.log('Listening on port 3000');
})
