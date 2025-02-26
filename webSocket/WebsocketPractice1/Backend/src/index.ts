import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port :8080});

//event Handler
wss.on("connection",function(socket){
    console.log("User Connected");
   
    socket.on("message",function(message){
        console.log(message.toString())
        console.log(message.toString()==="ping")
        if(message.toString()==="ping"){
            socket.send("Pong")
        }
        console.log("Received: "+message);
    }) 
})
