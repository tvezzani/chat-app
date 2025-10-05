import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public")); // serve frontend

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-room", (room, username) => {
    socket.join(room);
    socket.to(room).emit("chat-message", `${username} joined ${room}`);
  });

  socket.on("send-message", (room, msg) => {
    io.to(room).emit("chat-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));

