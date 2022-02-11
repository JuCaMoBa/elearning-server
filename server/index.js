const express = require("express");
const { logger, requestId, requestLog } = require("./config/logger");

// Express defination
const app = express();

// Middlewares
app.use(requestId);
app.use(requestLog);

app.get("/", (req, res, next) => {
  res.send("hello Word");
});

// Handler Error route not found
app.use((req, res, next) => {
  const message = "Error. Route Not Found";
  const statusCode = 404;
  logger.warn(message);
  next({
    statusCode,
    message,
  });
});

// Handler all Error
app.use((error, req, res, next) => {
  const { message = "", name = "" } = error;
  let { statusCode = 500 } = error;
  if (name === "ValidationError") {
    logger.warn(message);
  } else {
    logger.error(message);
  }
  res.status(statusCode);
  res.json({
    message,
    error,
  });
});

module.exports = app;
