require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  hostname: process.env.HOSTNAME || "127.0.0.1",
};

module.exports = config;
