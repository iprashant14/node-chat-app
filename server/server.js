const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
var {generateMessage,generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname , '../public');

const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

app.get('/',(req,res) => {
  res.send(index.html);
});

io.on('connection',(socket) => {
  //console.log("New user connected");
  // socket.emit('newEmail',{
  //   from : "Prashant",
  //   text : "Hi! :)",
  //   createdAt : 12345
  // });

  // socket.on('createEmail',(email) => {
  //   console.log("Email from client ",email);
  // });

  socket.on('join',(params,callback) => {
      if(! isRealString(params.name) || !isRealString(params.room)){
        return callback('Name and room are required');
      }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      //socket.leave(params.room);
      //io.emit() ---> io.to(params.room).emit();
      //socket.broadcast.emit() ---> socket.broadcast.to(params.room).emit();
      //socket.emit() ---> socket.emit();

      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
      socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  });

  socket.on('createMessage',(message,callback) => {
    //console.log("Message from client ",message);
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text))
    {
          io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }

    callback("This is from the server");
    // socket.broadcast.emit('newMessage',{
    //   from : message.from,
    //   text : message.text,
    //   createdAt : new Date().getTime()
    // });
  });

  socket.on('createLocationMessage',(coords) => {
    var user = users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }
  });

  socket.on('disconnect',() => {
    console.log("User Disonnected");
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has Left`));
    }
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
