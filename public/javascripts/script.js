var data = {lamp:'off', heater:'off'};

$.ajax({
  type: 'GET',
  contentType: 'application/json',
  url: 'http://10.0.1.23:3000/json',
  success: function(response) {
  console.log('success');
  var res = JSON.parse(response);
  console.log(res);
  if (res.lamp === 'on'){
    $('#flip-checkbox-1').click();
  }
  if (res.heater === 'on'){
    $('#flip-checkbox-2').click();
  }
}
})



$('#flip-checkbox-1').on('change', function(e){
  if (e.target.checked){
    data.lamp = 'on';
  } else {
    data.lamp = 'off';
  }
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://10.0.1.23:3000/lamp',
    success: function(data) {
    console.log('success');
    console.log(JSON.stringify(data));
  }
  })
})

$('#flip-checkbox-2').on('change', function(e){
  if (e.target.checked){
    data.heater = 'on';
  } else {
    data.heater = 'off';
  }
  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://10.0.1.23:3000/heater',
    success: function(data) {
    console.log('success');
    console.log(JSON.stringify(data));
  }
  })
})
