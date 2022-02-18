const express = require("express");
const controller = require("./controller");
const { auth } = require("../auth");
const { sanitizers } = require("./model");

const router = express.Router();

/*
 *
 * /api/users/signin     POST   - Signin
 * /api/users/signup     POST   - Signup
 * /api/users/profile    GET    - Get the profile of the current user
 * /api/users/profile    PUT    - Update the profile of the current user
 * /api/users/profile    PATCH  - Update the profile of the current user
 */

router.route("/signin").post(controller.signin);
router.route("/signup").post(sanitizers, controller.signup);

router
  .route("/profile")
  .get(auth, controller.profile)
  .put(auth, controller.update)
  .patch(auth, controller.update);

router
  .route("/profile/photo")
  .put(auth, controller.updatePhoto)
  .patch(auth, controller.updatePhoto);

module.exports = router;
