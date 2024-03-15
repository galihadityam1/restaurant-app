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
    origin: "http://localhost:3010",
    methods: ["get", "post"],
  },
});

app.use("/", router);

module.exports = {app, io};
