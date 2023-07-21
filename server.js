
import { app } from "./app.js"
import { database_connect } from "./database.con/databConnect.js";
import { Server } from "socket.io";







//database connect call here 
database_connect();







//applisting in this port 
app.listen(process.env.port,()=>{
    console.log("server is working");
})



const io = new Server({
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  
  global.onlineUsers = new Map();

  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });
  });