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
        const slug = req.query.slug;
        const course = await courseModel.getOneCourse(slug);
        res.json({
            status: 200,
            course
        })

    },
    createCourse: async (req, res) => {

    }
}