const PythonShell = require('python-shell');

function Switch(number){
  this.id = 'sw' + number
  this.state = "off"
  this.name = "Switch #" + number
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
}


module.exports = Switch;