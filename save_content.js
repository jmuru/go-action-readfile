const mongoose = require('mongoose');


const username = "josephmuruguru";
const password = "yRSHnTn0jSf66Ls4";
const host = "blog-content.rqepisu.mongodb.net";
const database="blog-content";
const uriA = `mongodb+srv://${username}:${password}@blog-content.rqepisu.mongodb.net/blog-content?retryWrites=true&w=majority`;
const uriB = `mongodb://${username}:${password}@blog-content.rqepisu.mongodb.net/blog-content?retryWrites=true&w=majority`;

// Define a Mongoose schema for the collection
const recordSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

async function connectToMongoDB(uri) {
  console.log(uri);
  try {
    await mongoose.connect(uri);

    console.log('Connected to MongoDB successfully!');
    insertRecord('John Doe', 30);
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

async function insertRecord(name, age) {
  try {
    // Create a new record instance
    const newRecord = new Record({
      name: name,
      age: age,
    });
    // Save the record to the database
    await newRecord.save();
    console.log('Record inserted successfully:', newRecord);
  } catch (error) {
    console.error('Failed to insert record:', error);
  }
}

// Usage
const mongoURI = `mongodb://${username}:${password}@${host}:27017/${database}`;
connectToMongoDB(uriA);
