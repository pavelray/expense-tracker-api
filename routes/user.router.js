const express = require("express");
const userController = require("../controller/user.controller");
const authController = require('../controller/auth.controller');

const router = express.Router();

router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createNewUser);

router
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/login', authController.login);

module.exports = router;