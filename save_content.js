const mongoose = require('mongoose');


const username = "josephmuruguru";
const password = "yRSHnTn0jSf66Ls4";
const host = "blog-content.rqepisu.mongodb.net";
const database="blog-content";
const uriA = `mongodb+srv://${username}:${password}@blog-content.rqepisu.mongodb.net/blog-content?retryWrites=true&w=majority`;
const uriB = `mongodb://${username}:${password}@blog-content.rqepisu.mongodb.net/blog-content?retryWrites=true&w=majority`;

async function connectToMongoDB(uri) {
  console.log(uri);
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}
// Usage
const mongoURI = `mongodb://${username}:${password}@${host}:27017/${database}`;
connectToMongoDB(mongoURI);
