const courseModel = require("../models/CourseModel")

module.exports = {
    getTop3Courses: async (req, res) => {
        const courses = await courseModel.getTop3Courses();
        res.json({
            status: 200,
            courses
        })
    }

}
