const express = require("express");
const { getAllUser, registerUser, loginUser, singleUser, updateUser, deleteUser }
    = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.route("/").get(getAllUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/login").post(loginUser);
userRoutes.route("/:id")
    .get(singleUser)
    .put(updateUser)
    .delete(deleteUser)

module.exports = userRoutes;