const fsPromises = require("fs").promises;
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtentions");

const dataPath = path.join(__dirname, "./files");

async function createFile(fileName, content) {
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

  try {
    await fsPromises.writeFile(
      path.join(__dirname, "./files", data.fileName),
      data.content,
      "utf-8"
    );

    getFiles();
  } catch (error) {
    return error;
  }
}

async function getFiles(req, res) {
  try {
    const data = await fsPromises.readdir(dataPath);

    if (data.length === 0) {
      res.status(400).json({ message: "client error" });
    }

    res.status(200).json({
      message: "success",
      files: data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function findFile(fileName) {
  try {
    const data = await fsPromises.readdir(dataPath);

    const sortedData = data.find((item) => item === fileName);

    if (!sortedData) return console.log("File is not found".bgRed);

    const requiredFile = await fsPromises.readFile(
      path.join(__dirname, "./files", fileName),
      "utf-8"
    );

    console.log({
      fileName: path.parse(fileName).name,
      content: requiredFile,
      extension: fileName.slice(fileName.lastIndexOf(".") + 1),
    });

    // console.log(requiredFile);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { createFile, getFiles, findFile };
