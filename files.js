const fsPromises = require("fs").promises;
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtentions");

function createFile(fileName, content) {
  const data = {
    fileName,
    content,
  };

  const result = dataValidator(data);
  const isCorrectedExtension = checkExtension(data.fileName);

  if (result.error) {
    console.error("Something went wrong");
    console.log(result.error.details[0].message.bgRed);
  }

  if (!isCorrectedExtension) {
    console.log("Extension isn`t supported".bgRed);
  }

  fsPromises
    .writeFile(
      path.join(__dirname, "./files", data.fileName),
      data.content,
      "utf-8"
    )
    .then((res) => console.log("File created successfully".bgBlue))
    .catch((error) => console.error(error));
}

function getFiles() {
  fsPromises
    .readdir(path.join(__dirname, "./files"))
    .then((data) => {
      if (data.length === 0) {
        console.log("Folder is empty").bgRed;
      }

      console.table(data);
    })
    .catch((error) => console.error(error));
}

function findFile(fileName) {
  return fsPromises
    .readdir(path.join(__dirname, "./files"))
    .then((data) => {
      const sortedData = data.find((item) => item === fileName);

      if (!sortedData) return console.log("File is not found".bgRed);

      return fsPromises.readFile(
        path.join(__dirname, "./files", fileName),
        "utf-8"
      );
    })
    .then((data) =>
      console.log({
        fileName: path.parse(fileName).name,
        content: data,
        extension: fileName.slice(fileName.lastIndexOf(".") + 1),
      })
    )
    .catch((error) => console.error(error));
}

module.exports = { createFile, getFiles, findFile };
