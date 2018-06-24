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
  var formattedTime = moment(message.createdAt).format('MMM Do, YYYY h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text : message.text,
    from : message.from,
    createdAt : formattedTime
  });
  jQuery('#messages').append(html);

  // var formattedTime = moment(message.createdAt).format('MMM Do, YYYY h:mm a');
  // console.log("Recieved new message ",message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);
});

// socket.emit('createMessage',{
//   from : "Prashant",
//   text : "Hi :)"
// },function(data){
//   console.log('Got it ',data);
// });

socket.on('newLocationMessage',function(message){
  var formattedTime = moment(message.createdAt).format('MMM Do, YYYY h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url : message.url,
    from : message.from,
    createdAt : formattedTime
  });
  jQuery('#messages').append(html);


  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>');
  // li.text(`${message.from} ${formattedTime}:`);
  // a.attr('href',message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});

var messageTextBox = jQuery('[name=message]');

jQuery("#message-form").on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:"User",
    text:messageTextBox.val()
  },function(){
      messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');

locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Your Browser not supports geolocation');
  }

  locationButton.attr('disabled','disabled').text('Sending Location...');
  navigator.geolocation.getCurrentPosition(function(position){
    //console.log(position);
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage',{
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch geolocation');
  });
});
