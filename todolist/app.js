const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

// console.log(date);
// console.log(date());

const app = express();

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to the todolist"
});

const item2 = new Item({
  name: "Press + button to add a new item"
});

const item3 = new Item({
  name: "<-- hit to delete an item"
});

const defaultItems = [item1, item2, item3];

// Item.insertMany(defaultItems, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved the default items in DB");
//   }
// });

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res) {
  // const day = date.getDate();
  // res.render("list", {listTitle: "Today", newItems: items});

  Item.find({}, function(err, foundItems) {
    if(foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved the default items in DB");
        }
      });
      res.redirect("/");
    } else {
      // console.log(foundItems);
      res.render("list", {listTitle: "Today", newItems: foundItems});
    }
  });
});

app.get("/:customListName", function(req, res) {
  // console.log(req.params.customListName);
  const customListName = req.params.customListName;

  // const list = new List({
  //   name: customListName,
  //   items: defaultItems
  // });
  // list.save();

  List.findOne({name: customListName}, function(err, foundList) {
    if(!err) {
      if(!foundList) {
        // console.log("Does not exist");
        // Create
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        // console.log("Exists");
        // Show
        res.render("list", {listTitle: customListName, newItems: foundList.items});
      }
    }
  });
});

app.post("/", function(req, res) {
  // console.log(req.body);
  // const item = req.body.newItem;
  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   // console.log(item);
  //   res.redirect("/");
  // }

  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");
});

// app.get("/work", function(req, res) {
//   res.render("list", {listTitle: "Work List", newItems: workItems});
// });

// app.post("/work", function(req, res) {
//   var item = req.body.newItem;
//   workItems.push(item);
//   res.redirect("/work");
// });

app.post("/delete", function(req, res) {
  // console.log(req.body);
  // console.log(req.body.checkbox);
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Successfully deleted checked item.")
    }
    res.redirect("/");
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server listening on port 3000");
});
