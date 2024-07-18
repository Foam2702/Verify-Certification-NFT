const express = require('express')
const ExamController = require("../controllers/ExamController")
const router = express.Router();


router.route("/postexam").post(ExamController.uploadExam).patch(ExamController.updateExamAndQuestions)
router.route("/:id").get(ExamController.getExam)
    .patch(ExamController.updateExam)
    .delete(ExamController.deleteExam)
router.route("/:courseid").get(ExamController.getQuestionByCourseId)

module.exports = router;
