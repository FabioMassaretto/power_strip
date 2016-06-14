const PythonShell = require('python-shell');
const fs = require('fs');
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

const state = [];


function init(){

  for (i=1;i<=5;i++){
    var str = offString(i);
    PythonShell.run(str, function (err) {
      // if (err) throw err;
    });
    state.push(new Switch(i))
  }
}

function onString(number){
  return './public/python/scripts/sw' + number + '_on.py'
}
function offString(number){
  return './public/python/scripts/sw' + number + '_off.py'
}

function getSwitch(string){
  return state.find(function(element){
    return element.id === string;
  })
}

function Switch(number){
  this.id = 'sw' + number
  this.state = "off"
  this.toggle = function(){
    if (this.state === "off"){
      var str = onString(this.id);
      PythonShell.run(str, function (err) {
        // if (err) throw err;
      });
      this.state = "on"
      console.log(this.state)
    }
    else {
      var str = offString(this.id);
      PythonShell.run(str, function (err) {
        // if (err) throw err;
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
  found.toggle();
  

  res.json(found)
})

init();
app.listen(3000, function(){
  console.log('Listening on port 3000');
})
