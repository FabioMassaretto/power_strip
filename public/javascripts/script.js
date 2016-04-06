var data = {lamp:'off', heater:'off'};



$('#flip-checkbox-1').on('change', function(e){
  if (e.target.checked){
    data.lamp = 'on';
    post();

  } else {
    data.lamp = 'off';
    post();
  }
}
)

$('#flip-checkbox-2').on('change', function(e){
  if (e.target.checked){
    data.heater = 'on';
    post();
  } else {
    data.heater = 'off';
    post();
  }
})

function post(){
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:8000/submit',
    success: function(data) {
    console.log('success');
    console.log(JSON.stringify(data));
  }
  })
}
