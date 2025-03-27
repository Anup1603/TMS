const express = require("express");
const auth = require("../middleware/auth");
const { getTenant, createTenant, getSingleTenant, updateTenent, deleteTenant, getAllTenant } = require("../controllers/tenantControllers");

const tenantRoutes = express.Router();

tenantRoutes.route("/").get(auth, getAllTenant);

tenantRoutes.route("/:propertyid").get(auth, getTenant);
tenantRoutes.route("/:propertyid/create").post(auth, createTenant);

tenantRoutes.route("/one/:id")
    .get(auth, getSingleTenant)
    .put(auth, updateTenent)
    .delete(auth, deleteTenant)

// tenantRoutes.route("/:propertyid/:id")
//     .get(auth, getSingleTenant)
//     .put(auth, updateTenent)
//     .delete(auth, deleteTenant)

module.exports = tenantRoutes;