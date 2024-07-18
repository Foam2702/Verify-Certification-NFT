const courseModel = require("../models/CourseModel")
// const examModel = require("../models/ExamModel")
module.exports = {
    getAllCourses: async (req, res) => {
        const courses = await courseModel.getAllCourses();
        res.json({
            status: 200,
            courses
        })
    },
    getOneCourse: async (req, res) => {
        const { id } = req.params;

        const course = await courseModel.getOneCourse(id);
        res.json({
            code: 200,
            status: "success",
            course
        })

    },
    getTop10Courses: async (req, res) => {
        const courses = await courseModel.getTop10Courses();
        res.json({
            status: 200,
            courses
        })
    },

    getExamForCourse: async (req, res) => {
        const { id } = req.params;
        const exams = await courseModel.getExamForCourse(id);
        res.json({
            status: "success",
            code: 200,
            exams
        })
    },
    getCourseByOrgAndInfo: async (req, res) => {
        const { org } = req.params
        const result = await courseModel.getCourseByOrgAndInfo(org)
        if (result) {
            res.json({
                status: "success",
                code: 200,
                message: "Course found",
                courses: result
            })
        }
        else {
            res.json({
                status: "fail",
                code: 404,
                message: "Course not found"
            })
        }
    },
    enrollCourse: async (req, res) => {
        const { address } = req.query;
        const { id } = req.params
        const result = await courseModel.enrollCourse(id, address);
        if (result) {
            res.json({
                status: "success",
                code: 200,
                message: "Enrolled successfully"
            })
        }
        else {
            res.json({
                status: "fail",
                code: 404,
                message: "Enrolled fail"
            })
        }
    },
    submitExam: async (req, res) => {
        console.log("submit exam")
        const { id } = req.params;
        const { address } = req.query;
        const answers = req.body; // Assuming this is an object where keys are question IDs and values are the selected options

        const correctAns = await courseModel.getExamForCourse(id); // Assuming this returns an array of questions with a correct_option field

        let score = 0;
        correctAns.forEach(question => {
            if (answers[question.id - 1] && (answers[question.id - 1].response === question.correct_option)) {
                score++;
            }
        });


        const resultPercentage = (score / correctAns.length) * 100;
        console.log(resultPercentage)
        // You can then decide what to do with the result, for example, save it, send it back in the response, etc.
        res.json({
            status: "success",
            code: 200,
            message: "Exam submitted successfully",
            score: resultPercentage
        });
    },


}