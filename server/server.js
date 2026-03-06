const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

io.on("connection", (socket) => {
  socket.on("send-location", (data) => {
    io.emit("receive-location", {
      id: socket.id,
      name: data.name,
      latitude: data.latitude,
      longitude: data.longitude
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});