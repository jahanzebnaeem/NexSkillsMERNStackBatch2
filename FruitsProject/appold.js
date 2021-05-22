const {MongoClient} = require("mongodb");
const assert = require("assert");

// connection URL
const uri = "mongodb://localhost:27017";

// DB Name
const dbName = 'fruitsDB';

// create mongo client
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

// use connet method
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to the server.");

  const db = client.db(dbName);
  // client.close();
  // insertDocument(db, function () {
  //   client.close();
  // });
  findDocuments(db, function() {
    client.close();
  });
});

const insertDocument = function (db, callback) {
  // get doc collection
  const collection = db.collection('fruits');
  // insert some document
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit for me"
    },
    {
      name: "Orange",
      score: 9,
      review: "Great fruit for vitamin c"
    },
    {
      name: "Banana",
      score: 8,
      review: "Great fruit mucles"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents in the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // get document collection
  const collection = db.collection('fruits');
  // find document
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
};
