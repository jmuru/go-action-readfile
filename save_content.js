const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');


const username = "josephmuruguru";
const password = "yRSHnTn0jSf66Ls4";
const host = "blog-content.rqepisu.mongodb.net";
const database="blog-content";
const mongoHost = `mongodb+srv://${username}:${password}@blog-content.rqepisu.mongodb.net/blog-content?retryWrites=true&w=majority`;

// Define a Mongoose schema for the collection
const recordSchema = new mongoose.Schema({
  name: String,
  content: String,
});

const BlogContent = mongoose.model('blog-content', recordSchema);

async function connectToMongoDB(uri, content, title) {
  console.log(uri);
  console.log(content);
  console.log(title);
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully!');
    // await BlogContent.db.collection.insertOne({ name: 'test Name', content: "test content" });
    const bc = new BlogContent({
      name: title,
      content: content,
    });
    bc.save().then(function (doc) {
      console.log(doc._id.toString());
      mongoose.connection.close();
    }).catch(function (error) {
      console.log(error);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

function readFilesInDirectory(directoryPath, callback) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    const dataArray = [];
    files.forEach((file, index) => {
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${filePath}:`, err);
          return;
        }
        dataArray.push({ fileName: file, content: content });
        if (index === files.length - 1) {
          // If it's the last file, invoke the callback with the populated array
          callback(dataArray);
        }
      });
    });
  });
}

// Usage example:
const directoryPath = './_posts';

function runner() {
  readFilesInDirectory(directoryPath, (dataArray) => {
    console.log(dataArray);
    connectToMongoDB(mongoHost, dataArray[0].content, dataArray[0].fileName)
  });

}

runner();
