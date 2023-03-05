let express = require('express');
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const socketIo = require('socket.io')
const io = socketIo(server);
const PORT = "3000"


app.use(express.static(path.join(__dirname + "/public")));

io.on('connection', (socket) => {
  socket.on("newUser" , (username)=>{
    socket.broadcast.emit("update" , username +" joined the conversation")
})
socket.on("exitUser" , (username)=>{
    socket.broadcast.emit("update" , username +" left the conversation")
})
socket.on("chat" , (message)=>{
    socket.broadcast.emit("chat" , message)
})

})


server.listen(PORT, ()=>{
  console.log(`server is running ${PORT}`);
})