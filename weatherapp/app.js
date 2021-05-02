const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
  const url = "https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=695ca5f03b96757465f1d38174759d66&units=metric";
  https.get(url, function(response) {
    // console.log(response.statusCode);
    response.on("data", function(data) {
      // console.log(data);
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      // console.log(temp);
      const weatherDescription = weatherData.weather[0].description;
      // console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imgURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature is currently " + temp + "</h1>");
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src= " + imgURL + ">");
      res.send();
    });
  });
  // res.send("Server is up and running");
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
