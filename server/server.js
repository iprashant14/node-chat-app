const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname , '../public');

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));

app.get('/',(req,res) => {
  res.send(index.html);
});

io.on('connection',(socket) => {
  console.log("New user connected");
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
  // socket.emit('newEmail',{
  //   from : "Prashant",
  //   text : "Hi! :)",
  //   createdAt : 12345
  // });

  // socket.on('createEmail',(email) => {
  //   console.log("Email from client ",email);
  // });

  socket.on('createMessage',(message,callback) => {
    console.log("Message from client ",message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback("This is from the server");
    // socket.broadcast.emit('newMessage',{
    //   from : message.from,
    //   text : message.text,
    //   createdAt : new Date().getTime()
    // });
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',() => {
    console.log("User Disonnected");
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
