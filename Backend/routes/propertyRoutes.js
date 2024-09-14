const express = require("express");
const auth = require("../middleware/auth");
const { getProperty, createProperty, getSingleProperty, updateProperty, deleteProperty } = require("../controllers/propertyControllers");

const propertyRoutes = express.Router();

propertyRoutes.route("/").get(auth, getProperty);
propertyRoutes.route("/create").post(auth, createProperty);

propertyRoutes.route("/:id")
    .get(auth, getSingleProperty)
    .put(auth, updateProperty)
    .delete(auth, deleteProperty)

module.exports = propertyRoutes;