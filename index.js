const { createFile, getFiles, findFile } = require("./files");
const argv = require("yargs").argv;
require("colors");

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;
    case "get":
      getFiles();
      break;
    case "find":
      findFile(fileName);
      break;

    default:
      console.warn("Unknown action type".bgRed);
  }
}

invokeAction(argv);
