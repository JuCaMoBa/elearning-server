const express = require("express");
const cors = require("cors");

const { cors: corsConfig } = require("./config");
const { logger, requestId, requestLog } = require("./config/logger");
const api = require("./api/v1");

// Express defination
const app = express();

// Middlewares
app.use(
  cors({
    origin: corsConfig.origin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Accept", "Content-Type", "Authorization"],
  })
);
app.use(requestId);
app.use(requestLog);
app.use(express.json()); // parse application/json

app.use("/api", api);

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
