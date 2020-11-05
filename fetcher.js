const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const path = process.argv[3];

request(url, (error, response, body) => {
  if (response.statusCode < 200 || response.statusCode > 299) {
    console.log(`Request was not successful, no file saved.  Error code: ${response.statusCode}`);
  } else {
    fs.writeFile(path, body, (err) => {
      if(err) {
        throw err;
      }
      const stats = fs.statSync(path);
      const fileSize = stats["size"];
      console.log(`Downloaded and saved ${fileSize} bytes to ${path}"`);
    });
  }
});


