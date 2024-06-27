const express = require('express')
const ExamController = require("../controllers/ExamController")
const router = express.Router();

router.route("/postexam").post(ExamController.uploadExam)
module.exports = router;
