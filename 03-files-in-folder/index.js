const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "secret-folder");
const options = { withFileTypes: true };

fs.readdir(filePath, options, (err, files) => {
  files.forEach((item) => {
    // const name = item.name.split(".").splice(0, 1);
    const itemExt = path.extname(item.name);
    const itemPath = path.join(filePath, item.name);
    const name = path.basename(itemPath, itemExt);

    fs.stat(itemPath, (err, stats) => {

    });
    if (item.isFile()) {
      fs.stat(itemPath, (err, stats) => {
        console.log(`${name} ${itemExt} ${(stats.size/1024).toFixed(2)}kb`);
      });
    }
  });
});
