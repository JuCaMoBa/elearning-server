const express = require("express");
const controller = require("./controller");
const { auth, owner } = require("../auth");
const { sanitizers } = require("./model");

const router = express.Router({
  mergeParams: true,
});

/*
 * /api/users/maxscores      POST   - Create a new Score
 * /api/users/maxscores      GET    - Get a Score
 * /api/users/maxscores/:id  PUT    - Update a Score
 * /api/users/maxscores/:id  DELETE - Delete a Score
 */

router
  .route("/")
  .post(controller.parentId, auth, sanitizers, controller.create);

router.param("id", controller.id);

router
  .route("/:id")
  .get(controller.parentId, controller.read)
  .put(controller.parentId, auth, owner, sanitizers, controller.update)
  .patch(controller.parentId, auth, owner, sanitizers, controller.update)
  .delete(controller.parentId, auth, owner, controller.delete);

module.exports = router;
