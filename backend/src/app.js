const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Small Business Inventory API is running",
  });
});


app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API is healthy",
  });
});

module.exports = app;