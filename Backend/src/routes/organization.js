const express = require('express')
const organizationController = require("../controllers/OrganizationController")
const router = express.Router();

router.route("/").get(organizationController.getAllOrganization).post(organizationController.insertOrganization)
// router.route("/:address").get(addressController.getAddressPub).post(addressController.insertAdressPub)
// router.route("/profile/:address").patch(addressController.updateInfo).get(addressController.getAddressPub)
module.exports = router;
