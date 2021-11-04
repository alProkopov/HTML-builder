const fs = require("fs");
const path = require("path");

const stylesPath = path.join(__dirname, "styles");
const projectPath = path.join(__dirname, "project-dist");
const options = { withFileTypes: true };
let stylesArray = [];
const bundlePath = path.join(__dirname, "./project-dist/bundle.css");
const writeStream = fs.createWriteStream(bundlePath);

console.log(bundlePath);

fs.readdir(stylesPath, options, (err, files) => {
  files.forEach((item) => {
    const itemPath = path.join(stylesPath, item.name);
    const itemExt = path.extname(item.name);

    // console.log(itemPath);

    if (item.isFile() && itemExt == ".css") {
      fs.readFile(itemPath, (err, data) => {
        
        stylesArray.push(data.toString());
        writeStream.write(data);
      });
    }
  });
});

function bundleClear() {
  fs.unlink(bundlePath, (err) => {
    if (err) throw err;
  });
}
