function checkExtension(fileName) {
  const EXTENSIONS = ["txt", "json", "js", "log", "xml", "jaml"];

  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);

  const result = EXTENSIONS.some((type) => type.includes(fileExtension));

  return result;
}

module.exports = checkExtension;
