const PythonShell = require('python-shell');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

function Switch(switchObj){
  // Inherit properties from mongodb object 
  this._id = switchObj._id
  this['switch_num'] = switchObj['switch_num'] || 'sw'
  this.state = switchObj.state || "off"
  this.name = switchObj.name || "switch"
  this.type = switchObj.type || "default"
  this.group = switchObj.group || ""


  this.toggle = function(){
    (this.state === "on") ? this.setState("off") : this.setState("on");
  }
  this.setState = async function(state){
    let number = Number(this.switch_num.replace(/\D/g, ''));
    var str = state === "on" ? onString(number) : offString(number);
    try{
      PythonShell.run(str, function (err) {
      });
    }
    catch(err){
      console.log(err)
    }
    var uri = process.env.DB_URI;
    var id = this._id;
    await MongoClient.connect(uri, function(err, db) {
      var switchCollection = db.collection('Switches');
      var messageCollection = db.collection('messages');
      switchCollection.updateOne({_id: id}, {$set:{
        state: state
      }}).then(value=>{
        messageCollection.insert({text: "switch updated"})
      })
      .catch(err =>{
        console.log(err)
      })
    })
    this.state = state;
    return Promise.resolve(this);
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