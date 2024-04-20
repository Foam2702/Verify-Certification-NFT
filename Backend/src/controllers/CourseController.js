const courseModel = require("../models/CourseModel")

module.exports = {
    getAllCourses: async (req, res) => {
        const courses = await courseModel.getAllCourses();
        console.log(courses)
        res.json({
            status: 200,
            courses
        })
    },
    createCourse: async (req, res) => {

    }
}