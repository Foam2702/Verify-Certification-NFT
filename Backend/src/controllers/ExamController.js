const examModel = require("../models/ExamModel")
const CourseController = require("./CourseController")
const courseModel = require("../models/CourseModel")
module.exports = {
    getExam: async (req, res) => {
        const { id } = req.params
        const { address } = req.query
        const exist = await examModel.getExam(id, address)

        if (exist.length == 0) {
            res.json({
                code: 200,
                message: 'Enroll',
                data: exist
            })

        }
        else {
            res.json({
                code: 404,
                message: 'Already enroll',
                data: exist
            })
        }

    },
    uploadExam: async (req, res) => {
        const result = req.body
        const course = {
            slug: result.shortName,
            name: result.certificateName,
            description: result.description,
            image: result.imageUrl,
            licensing_authority: result.org
        }
        const checkCourseNameExist = await courseModel.getCourseName(course.name)
        if (checkCourseNameExist.length == 0) {
            const insertCourse = await courseModel.insertCourse(course)
            const exam = {
                course: insertCourse,
                questions: result.questions
            }
            const insertQuestion = await examModel.insertQuestions(exam)
            if (insertQuestion) {
                res.json({
                    code: 200,
                    message: 'Insert Exam successfully'
                })
            }
        }
        else if (checkCourseNameExist.length != 0) {
            res.json({
                code: 400,
                message: 'Course name already exist'
            })
        }
        else {
            res.json({
                code: 400,
                message: 'Insert Exam failed'
            })
        }

    },
    updateExam: async (req, res) => {
        const { id } = req.params
        const { address, status } = req.query
        console.log(id, address, status)
        await examModel.updateExam(id, address, status)
        res.json({
            code: 200,
            message: 'Update status successfully'
        })
    },
    deleteExam: async (req, res) => {
        const { id } = req.params
        const { address } = req.query
        const result = await examModel.deleteExam(id, address)
        if (result) {
            res.json({
                code: 200,
                message: 'Delete  user successfully'
            })
        }
        else {
            res.json({
                code: 400,
                message: 'Delete  user failed'
            })
        }

    }
}