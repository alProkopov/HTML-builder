const fs = require("fs");
const path = require("path");
const readline = require("readline");

const filePath = path.join(__dirname, "new-text.txt");
const writeStream = fs.createWriteStream(filePath);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

writeStream.on("ready", () => console.log("ЩАС СПОЮ...\n"));

rl.on("line", (data) => {
  writeStream.write(`${data}\n`);

  if (data == "exit") {
    rl.close();
  }
});

rl.on('close',()=>console.log('Ты заходи, если что...'))
