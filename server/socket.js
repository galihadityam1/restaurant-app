const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["get", "post"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A client connected", socket.id);

    socket.on("reactEvent", (data) => {
      console.log("Received data from React:", data);
    });

    socket.emit("payment test", { name: "aaa" });
  });

  return io;
}

module.exports = initSocket
