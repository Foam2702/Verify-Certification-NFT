const express = require('express')
const ExamController = require("../controllers/ExamController")
const router = express.Router();

router.route("/postexam").post(ExamController.uploadExam)
router.route("/:id").get(ExamController.getExam)
    .patch(ExamController.updateExam)

module.exports = router;
