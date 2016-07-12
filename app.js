require('dotenv').config();

const PythonShell = require('python-shell');
const fs = require('fs');
const express = require('express');
const bodyParser= require('body-parser');
const path = require('path')
const app = express();

// local state
const state = [];

// saved JSON info
var readableStream = fs.createReadStream('saveState.json');
var data = ''

readableStream.on('data', function(chunk) {
    data+=chunk;
});

readableStream.on('end', function() {
  var parsed = JSON.parse(data);

  for (i=0;i<state.length;i++){
    if(parsed[i].name) state[i].name = parsed[i].name;
    
    if(parsed[i].state) {
      state[i].state = parsed[i].state;
      
      var str = state[i].state === "on" ? onString(i) : offString(i);
      PythonShell.run(str, function (err) {
        if (!process.env.DEV){
          if (err) throw err;
        } 
      });
    }

  }
});


function saveState (){
  var parsed = JSON.parse(data);

  for (i=0;i<state.length;i++){
    if(parsed[i]) parsed[i].name = state[i].name;
    if(parsed[i]) parsed[i].state = state[i].state;

  }


  fs.writeFile('./saveState.json', JSON.stringify(parsed) )
}


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

var jsonParser = bodyParser.json();


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
  var found = getSwitch(req.params.id);
  found.toggle();
  saveState();
  res.json(found)
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


