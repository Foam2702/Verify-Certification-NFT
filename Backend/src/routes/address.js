const express = require('express')
const addressController = require("../controllers/AddressController")
const router = express.Router();

router.route("/:address").get(addressController.getAddressPub).post(addressController.insertAdressPub)
router.route("/profile/:address").patch(addressController.updateInfo)
module.exports = router;
