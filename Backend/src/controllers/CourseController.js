const courseModel = require("../models/CourseModel")

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
    getExamForCourse: async (req, res) => {
        const { id } = req.params;
        const exams = await courseModel.getExamForCourse(id);
        res.json({
            status: "success",
            code: 200,
            exams
        })
    },
    submitExam: async (req, res) => {
        const { id } = req.params;
        const { answers } = req.body;
        const correctAns = courseModel.getCorrectAns()
        // const result = await courseModel.submitExam(id, answers);
        // res.json({
        //     status: "success",
        //     code: 200,
        //     result
        // })
        res.json({
            exam: answers,
            id: id
        })
    }
}