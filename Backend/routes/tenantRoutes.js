const express = require("express");
const auth = require("../middleware/auth");
const { getTenant, createTenant, getSingleTenant, updateTenent, deleteTenant } = require("../controllers/tenantControllers");

const tenantRoutes = express.Router();

tenantRoutes.route("/:propertyid").get(auth, getTenant);
tenantRoutes.route("/:propertyid/create").post(auth, createTenant);

tenantRoutes.route("/:propertyid/:id")
    .get(auth, getSingleTenant)
    .put(auth, updateTenent)
    .delete(auth, deleteTenant)

module.exports = tenantRoutes;