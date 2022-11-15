const express = require("express");
const path = require("path");

const app = express();

// Express Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// this function returns the website - update with any html
app.get("/", function (res) {
  res.redirect("index.html");
});

app.listen(3000);
