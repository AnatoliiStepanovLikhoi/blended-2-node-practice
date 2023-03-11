const express = require("express");

const { createFile, getFiles, findFile } = require("./files");

const filesRouter = express.Router();

filesRouter.get("/", getFiles);
filesRouter.get("/:filename", findFile);
filesRouter.post("/", createFile);

module.exports = filesRouter;
