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
            status: 200,
            course
        })

    },
    getExamForCourse: async (req, res) => {
        const { id } = req.params;
        const exams = await courseModel.getExamForCourse(id);
        res.json({
            status: 200,
            exams
        })
    }
}