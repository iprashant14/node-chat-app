var socket = io();
socket.on('connect',function() {
  console.log("Connected to server");
  // socket.emit('createEmail',{
  //   to : "Shubham Katiyar",
  //   text : "With love!"
  // });
});

socket.on('disconnect',function() {
  console.log("Disonnected from server");
});

// socket.on('newEmail',function(email){
//   console.log("Recieved new email ",email);
// });

socket.on('newMessage',function(message){
  console.log("Recieved new message ",message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from : "Prashant",
//   text : "Hi :)"
// },function(data){
//   console.log('Got it ',data);
// });

socket.on('newLocationMessage',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');
  li.text(`${message.from}`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery("#message-form").on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:"User",
    text:jQuery('[name=message]').val()
  },function(){

  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Your Browser not supports geolocation');
  }

  navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    alert('Unable to fetch geolocation');
  });
});