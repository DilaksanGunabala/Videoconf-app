const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", socket => {
  console.log("A user connected");

  socket.on("join", data => {
    console.log(data);
    socket.join(data.roomId);
    io.to(data.roomId).emit("user-joined", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

http.listen(3000, () => {
  console.log("Server running on port 3000");
});
