const fs = require("fs");
const path = require("path");

const templatePath = path.join(__dirname, "template.html");
const componentPath = path.join(__dirname, "components");
const options = { withFileTypes: true };

const dirPath = path.join(__dirname, "project-dist");

let templateData = undefined;

fs.access(dirPath, fs.constants.F_OK, (err) => {
  if (err) {
    // console.log("false");

    createDir();
    readTemplate();
    mergeCss();
  } else {
    console.log("true");
    removeDir();
  }
});

function removeDir() {
  fs.rm(dirPath, { recursive: true }, (err) => {
    // if (err) throw err;
    createDir();
    readTemplate();
    mergeCss();
  });
}

function createDir() {
  fs.mkdir(dirPath, (err) => {
    if (err) throw err;
    copyAssets();
  });
}

function readTemplate() {
  fs.readFile(templatePath, (err, data) => {
    templateData = data.toString();
    findTag();
  });
}

function findTag() {
  const finalHtmlPath = path.join(__dirname, "./project-dist/index.html");
  const writeStream = fs.createWriteStream(finalHtmlPath);
  fs.readdir(componentPath, options, (err, files) => {
    files.forEach((item, index) => {
      const itemPath = path.join(componentPath, item.name);
      const itemExt = path.extname(item.name);
      const itemName = path.basename(item.name, itemExt);
      const itemReg = new RegExp(`{{${itemName}}}`, "g");

      if (item.isFile() && itemExt == ".html") {
        fs.readFile(itemPath, (err, data) => {
          templateData = templateData.replace(itemReg, data.toString());
          if (index == files.length - 1) {
            writeStream.write(templateData);
          }
        });
      }
    });
  });
}

//css

function mergeCss() {
  const stylesPath = path.join(__dirname, "styles");
  const bundlePath = path.join(__dirname, "./project-dist/style.css");
  const writeStreamCss = fs.createWriteStream(bundlePath);

  fs.readdir(stylesPath, options, (err, files) => {
    files.forEach((item) => {
      const itemPath = path.join(stylesPath, item.name);
      const itemExt = path.extname(item.name);

      if (item.isFile() && itemExt == ".css") {
        fs.readFile(itemPath, (err, data) => {
          writeStreamCss.write(data);
        });
      }
    });
  });
}

//assets

function copyAssets() {
  const assetsPath = path.join(__dirname, "assets");
  const copyDirPath = path.join(dirPath, "assets");

  let folderExist = fs.access(copyDirPath, fs.constants.F_OK, (err) => {
    if (err) {
      createDir();
    } else {
      removeDir(createDir);
    }
  });

  function createDir() {
    fs.mkdir(copyDirPath, { recursive: true }, () => {});
    copyFiles(assetsPath, copyDirPath);
  }

  function removeDir(callback) {
    fs.rm(copyDirPath, { recursive: true }, (err) => {
      if (err) throw err;
      callback();
    });
  }

  function copyFiles(from, to) {
    fs.mkdir(to, { recursive: true }, () => {
      fs.readdir(from, options, (err, files) => {
        files.forEach((item) => {
          if (item.isFile()) {
            // console.log(item.name);
            const filePath = path.join(from, item.name);
            // console.log(filePath);
            const copyFilePath = path.join(to, item.name);
            fs.copyFile(filePath, copyFilePath, (err) => {});
          } else {
            copyFiles(path.join(from, item.name), path.join(to, item.name));
          }
        });
      });
    });
  }
}
