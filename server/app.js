// if (process.env.NODE_ENV !== "production") {
require("dotenv").config();
//   }
const express = require("express");
const router = require("./routers");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["get", "post"],
  },
});

io.on('connection', (socket) => {
  console.log('A client connected', socket.id);

  socket.on('reactEvent', (data) => {
    console.log('Received data from React:', data);
  })

  socket.emit("payment test", {name: "aaa"})
})

// io.listen(3010)


app.use("/", router);

module.exports = {app, io};
