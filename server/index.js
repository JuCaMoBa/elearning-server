const express = require("express");

const app = express();

app.get("/", (req, res, next) => {
  res.send("hello Word");
});

// Handler Error route not found
app.use((req, res, next) => {
  const message = "Error. Route Not Found";
  const statusCode = 404;
  next({
    statusCode,
    message,
  });
});

// Handler all Error
app.use((error, req, res, next) => {
  const { message = "", name = "" } = error;
  let { statusCode = 500 } = error;
  console.log(error.name);
  if (name === "ValidationError") {
    statusCode = 422;
  }
  res.status(statusCode);
  res.json({
    message,
    error,
  });
});

module.exports = app;
