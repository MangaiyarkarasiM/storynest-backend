const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ['GET','POST']
  },
});

io.on("connection", function (socket) {
  io.sockets.emit("receive_message", "hello");
  socket.on("disconnect", function () {
    socket.emit("broadcast", { description: " clients connected!" });
  });
});

//module.exports = { sendMessage };
