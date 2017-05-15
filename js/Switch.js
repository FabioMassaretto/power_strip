const PythonShell = require('python-shell');

function Switch(switchValues){
  this.id = switchValues.id || "sw"
  this.state = switchValues.state || "off"
  this.name = switchValues.name || "switch"
  this.toggle = function(){
    (this.state === "on") ? this.setState("off") : this.setState("on");
  }
  this.setState = function(state){
    var str = state === "on" ? onString(this.id[2]) : offString(this.id[2]);
    try{
      PythonShell.run(str, function (err) {
      });
    }
    catch(err){
      console.log(err)
    }
    this.state = state;
  }
  this.setState(this.state);
}    


// needed due to a quirk with PythonShell
function onString(number){
  return './public/python/scripts/sw' + number + '_on.py'
}
function offString(number){
  return './public/python/scripts/sw' + number + '_off.py'
}

module.exports = Switch;