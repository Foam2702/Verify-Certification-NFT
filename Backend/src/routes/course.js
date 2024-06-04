const express = require('express')
const courseController = require("../controllers/CourseController")
const router = express.Router();
const multer = require('multer')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, appDir + '/public/img')      //you tell where to upload the files,
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.png')
//     }
// })
// var upload = multer({
//     storage: storage,
//     onFileUploadStart: function (file) {
//         console.log(file.originalname + ' is starting ...')
//     },
// });

router
    .route("/")
    .get(courseController.getAllCourses)
router
    .route("/course/:id")
    .get(courseController.getOneCourse);
router
    .route("/course/:id/exam")
    .get(courseController.getExamForCourse)
    .post(courseController.submitExam)


module.exports = router;
