// if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
//   }
  const express = require("express");
  const router = require("./routers");
  const app = express();
  const port = 3010
  const cors = require('cors');
  app.use(cors())
  
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
  app.use("/", router);
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  
  module.exports = app;
  