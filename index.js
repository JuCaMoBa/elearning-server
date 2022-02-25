const http = require("http");
const app = require("./server");
const config = require("./server/config");
const { connect } = require("./server/database");

const { port, database } = config;

// Database
connect({
  protocol: database.protocol,
  url: database.url,
  username: database.username,
  password: database.password,
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running in http://127.0.0.1:${port}/`);
});
