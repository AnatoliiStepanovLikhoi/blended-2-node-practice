const fsPromises = require("fs").promises;
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtentions");

const dataPath = path.join(__dirname, "./files");

async function createFile(req, res) {
  const data = req.body;

  const result = dataValidator(data);

  const isCorrectedExtension = checkExtension(data.fileName);

  if (result.error) {
    res.status(400).json({ message: result.error.details[0].message });
    return;
  }

  if (!isCorrectedExtension) {
    res.status(400).json({ message: "extension is not supported" });
    return;
  }

  try {
    await fsPromises.writeFile(
      path.join(__dirname, "./files", data.fileName),
      data.content,
      "utf-8"
    );

    res.status(201).json({ message: "file created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

async function findFile(req, res) {
  try {
    const data = await fsPromises.readdir(dataPath);

    console.log(req.params);

    const sortedData = data.find((item) => item === req.params.filename);

    if (!sortedData) {
      res.status(400).json({
        message: `File with filename ${req.params.filename} is not found`,
      });
      return;
    }

    const requiredFile = await fsPromises.readFile(
      path.join(__dirname, "./files", req.params.filename),
      "utf-8"
    );

    res.status(200).json({
      fileName: req.params.filename,
      content: requiredFile,
      extension: req.params.filename.slice(
        req.params.filename.lastIndexOf(".") + 1
      ),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createFile, getFiles, findFile };
