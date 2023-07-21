const fs = require('fs');
const path = require('path');

function readFilesInDirectory(directoryPath) {
  let results = [];
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);
      fs.readFile(filePath, 'utf8', (err, content) => {
        if (err) {
          console.error(`Error reading file ${filePath}:`, err);
          return;
        }
        console.log(`Contents of ${filePath}:`);
        console.log(content);
        console.log('---');
        results.push(content)
      });
    });
  });
  return results[0];
}
// Usage example:
const directoryPath = './_posts';
readFilesInDirectory(directoryPath);
