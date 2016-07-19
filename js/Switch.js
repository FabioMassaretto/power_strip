const PythonShell = require('python-shell');

function Switch(switchValues){
  this.id = switchValues.id || "sw"
  this.state = switchValues.state || "off"
  this.name = switchValues.name || "switch"
  this.toggle = function(){
    (this.state === "on") ? this.setState("off") : this.setState("on");
  }
  this.setState = function(state){
    var str = '../public/python/scripts/sw'
    if (state === "off"){
      str += this.id[2] + '_off.py'
    }
    else {
      str += this.id[2] + '_on.py'
    }
    PythonShell.run(str, function (err) {
      if (!process.env.DEV){
        if (err) throw err;
      } 
    });
    this.state = state;
  }
  this.setState(this.state);
}


module.exports = Switch;