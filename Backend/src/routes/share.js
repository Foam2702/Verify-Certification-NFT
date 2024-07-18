const express = require('express')
const shareController = require("../controllers/ShareController")
const router = express.Router();

router
    .route("/")
    .get(shareController.getAllShareCertificate)
    .post(shareController.insertShareCertificate)
    .delete(shareController.deleteShareCertificate)
router
    .route("/:id")
    .get(shareController.getOneShareCertificate)

// router.route("/:address").get(addressController.getAddressPub).post(addressController.insertAdressPub)
// router.route("/profile/:address").patch(addressController.updateInfo).get(addressController.getAddressPub)
module.exports = router;
