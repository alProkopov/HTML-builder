const fs = require("fs");
const path = require("path");

const dirPath = path.join(__dirname, "files");
const copyDirPath = path.join(__dirname, "copy-files");

const options = { withFileTypes: true };
console.log(copyDirPath);

let folderExist = fs.access(copyDirPath, fs.constants.F_OK, (err) => {
  if (err) {
    copyFiles(dirPath, copyDirPath);
    copyFiles();
  } else {
    removeDir(createDir);
  }
});

function createDir() {
  fs.mkdir(copyDirPath, { recursive: true }, () => {});
  copyFiles(dirPath, copyDirPath);
}

function removeDir(callback) {
  fs.rm(copyDirPath, { recursive: true }, (err) => {
    if (err) throw err;
    callback();
  });
}

// function copyFiles() {
//   fs.readdir(dirPath, options, (err, files) => {
//     files.forEach((item) => {
//       const filePath = path.join(dirPath, item.name);
//       const copyFilePath = path.join(copyDirPath, item.name);
//       fs.copyFile(filePath, copyFilePath, (err) => {});
//     });
//   });
// }

function copyFiles(from, to) {
  fs.mkdir(to, { recursive: true }, () => {
    fs.readdir(from, options, (err, files) => {
      files.forEach((item) => {
        if (item.isFile()) {
          const filePath = path.join(from, item.name);
          const copyFilePath = path.join(to, item.name);
          fs.copyFile(filePath, copyFilePath, (err) => {});
        } else {
          copyFiles(path.join(from, item.name), path.join(to, item.name));
        }
      });
    });
  });
}
