const express = require('express')
const certificateController = require("../controllers/CertificateController")
const router = express.Router();

router.route("/").post(certificateController.insertCertificate).delete(certificateController.deleteCertificate)
module.exports = router;
