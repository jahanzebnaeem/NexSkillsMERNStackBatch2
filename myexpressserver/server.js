const express = require('express');

const app = express();

app.get("/", function(req, res) {
  // console.log(request);
  res.send("<h1>Hello Class</h1>");
});

app.get("/contact", function(req, res) {
  // console.log(request);
  res.send("Contact me by email");
});

app.get("/about", function(req, res) {
  // console.log(request);
  res.send("My name is Jahanzeb and I love development.");
});

app.get("/hobbies", function(req, res) {
  // console.log(request);
  res.send("<ul><li>Coding</li><li>Teaching</li></ul>");
});

app.listen(3000, function() {
  console.log("Server listening on port 3000.")
});
