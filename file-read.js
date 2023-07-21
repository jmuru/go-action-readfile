const fs = require('fs');
const path = require('path');

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
readFilesInDirectory(directoryPath, (dataArray) => {
  console.log(dataArray);
});
