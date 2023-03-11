const express = require("express");
const morgan = require("morgan");
const filesRouter = require("./router");

const app = express();

app.use(morgan("combined"));

app.use(express.json());

app.use("/api/files", filesRouter);

app.listen(8080, () => {
  console.log("server is running on port 8080");
});
