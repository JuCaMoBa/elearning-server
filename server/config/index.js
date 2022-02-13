require("dotenv").config();

const config = {
  port: process.env.PORT || 4000,
  hostname: process.env.HOSTNAME || "127.0.0.1",
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  database: {
    protocol: process.env.DATABASE_PROTOCOL,
    url: process.env.DATABASE_URL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  cors: {
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  },
};

module.exports = config;
