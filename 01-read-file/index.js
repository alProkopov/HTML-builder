const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "text.txt");

let read = fs.createReadStream(filePath);

read.on("data", (chunk) => {
  console.log(chunk.toString());
});

