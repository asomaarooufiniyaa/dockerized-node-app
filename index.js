const express = require("express");
const mongoose = require("mongoose");

const app = express();

const mongoUrl = "mongodb://aso:aso20017701@mongo:27017/?authSource=admin";

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
