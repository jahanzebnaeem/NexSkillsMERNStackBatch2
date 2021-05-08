const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var items = ["Buy Food", "Cook Food", "Eat Food"];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  var todayDate = new Date();
  // var today = todayDate.getDay();
  // var day = "";
  // console.log(todayDate);
  // if (today === 6 || today === 0) {
  //   res.send("Weekend");
  // } else {
  //   res.send("Weekday");
  // }
  // switch (today) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //     day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thurday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  //     break;
  //   default:
  //     console.log("Days have passed the limit");
  // }

  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  var day = todayDate.toLocaleDateString("en-US", options);

  res.render("list", {dayOfWeek: day, newItems: items});
});

app.post("/", function(req, res) {
  var item = req.body.newItem;
  items.push(item);
  // console.log(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
