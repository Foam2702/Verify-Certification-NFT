const express = require("express")
const HomeController = require("../controllers/HomeController")
const router = express.Router();


router
    .route("/")
    .get(HomeController.getTop3Courses)

module.exports = router;