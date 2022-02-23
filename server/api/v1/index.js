const express = require("express");
const users = require("./users/routes");
const maxscores = require("./maxscores/routes");

const router = express.Router();

router.use("/users", users);
router.use("/maxscores", maxscores);

module.exports = router;
