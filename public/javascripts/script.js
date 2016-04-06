var data = {lamp:'off', heater:'off'};



$('#flip-checkbox-1').on('change', function(e){
  if (e.target.checked){
    data.lamp = 'on';
    post(lamp);

  } else {
    data.lamp = 'off';
    post(lamp);
  }
}
)

$('#flip-checkbox-2').on('change', function(e){
  if (e.target.checked){
    data.heater = 'on';
    post(heater);
  } else {
    data.heater = 'off';
    post(heater);
  }
})

function post(switch){
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: `http://10.0.1.23:3000/${switch}`,
    success: function(data) {
    console.log('success');
    console.log(JSON.stringify(data));
  }
  })
}
