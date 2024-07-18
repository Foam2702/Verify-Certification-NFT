const express = require('express')
const addressController = require("../controllers/AddressController")
const router = express.Router();

router.route("/").post(addressController.insertAddress).delete(addressController.deleteAddress)
router.route("/:address").get(addressController.getAddressPub).post(addressController.insertAdressPub)
router.route("/profile/:address").patch(addressController.updateInfo).get(addressController.getAddressPub)
module.exports = router;
