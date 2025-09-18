const express = require("express");
const mongoose = require("mongoose");

const config = require("./config/config");

const app = express();

const mongoUrl = `mongodb://${config.mongo_user}:${config.mongo_password}@${config.mongo_ip}:${config.mongo_port}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose.connect(mongoUrl)
    .then(() => console.log("✅ Successfully connected to DB"))
    .catch((err) => {
      console.error("❌ Failed to connect to DB, retrying in 5s...", err.message);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h1>Sallam</h1>");
});

const port = process.env.PORT || 1025;

app.listen(port, () => {
  console.log(`🚀 Listening on port ${port}`);
});
