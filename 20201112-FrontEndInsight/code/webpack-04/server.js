const express = require("express");

const app = express();

app.get("/api/info", (req, res) => {
  res.json({
    name: "老韩",
  });
});

app.listen("9092");
