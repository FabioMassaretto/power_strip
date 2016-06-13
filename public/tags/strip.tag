<strip>
  <div class= "box">
    <h3>{ opts.title }</h3>
    <switch each={opts.switches} id={this.id} state={this.state}></switch>
  </div>

  for(var i=1;i<=5;i++){
    var obj = new Switch(i)
    opts.switches.push(obj)
  }
  this.update()
  function Switch(num){
    this.id = i;
    this.state = "off";
  }

</strip>

<switch>
  <p>Outlet #{id}</p>
  <li>Status: {state}</li>
  <hr>
</switch>