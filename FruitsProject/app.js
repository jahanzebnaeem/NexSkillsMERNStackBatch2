const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your entry, name is required"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const fruit = new Fruit({
//   name: "Apple",
//   rating: 7,
//   review: "Good for me"
// });

// fruit.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 7,
//   review: "Good for me"
// });
//
// const orange = new Fruit({
//   name: "Orange",
//   rating: 8,
//   review: "Good for me"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 9,
//   review: "Good for me"
// });
//
// Fruit.insertMany([kiwi, orange, banana], function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("successfully saved all the values");
//   }
// });

// const fruit = new Fruit({
//   name: "Mango",
//   rating: 27,
//   review: "Best fruit ever"
// });

// const fruit = new Fruit({
//   rating: 1,
//   review: "New Peach is a good fruit for me"
// });
//
// fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const person = new Person({
//   name: "Jahanzeb",
//   age: 39
// });

// const pineapple = new Fruit({
//   name: "Pineapple",
//   rating: 1,
//   review: "Good Fruit"
// });
//
// pineapple.save();

// const mango = new Fruit({
//   name: "Mango",
//   rating: 1,
//   review: "Good Fruit"
// });
//
// mango.save();

const papaya = new Fruit({
  name: "Papaya",
  rating: 1,
  review: "Good Fruit"
});

papaya.save();

// const person = new Person({
//   name: "Alishba",
//   age: 11,
//   favoriteFruit: mango
// });
//
// person.save();

Person.updateOne({name: "Jahanzeb"}, {favoriteFruit: papaya}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully updated the doc");
  }
});

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {
    // console.log(fruits);

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

// Fruit.updateOne({_id: "60a8f5c4336199b09bc8e12b"}, {name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// });

// Fruit.deleteOne({name: "Peach"}, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// });
