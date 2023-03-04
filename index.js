//server
const { Server } = require("http");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;
// const io = require("socket.io")(http);
const io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });

//middleware
app.use(express.static(__dirname + "/public"))
app.use(express.static('public'));
app.get("/",(req,res)=>{
        //res.send("hallo world!");
        res.sendFile(__dirname + '/index.html');
})

http.listen(PORT, ()=>{
    console.log(`Listning on port ${PORT}`);
})

//socket connection


io.on("connection",(socket)=>{
    
  
    socket.on("message",(msg)=>{
       
        socket.broadcast.emit("message",msg);
    })
})