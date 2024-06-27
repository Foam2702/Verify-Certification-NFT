const examModel = require("../models/ExamModel")
const CourseController = require("./CourseController")
const courseModel = require("../models/CourseModel")
module.exports = {
    uploadExam: async (req, res) => {
        const result = req.body
        const course = {
            slug: result.shortName,
            name: result.certificateName,
            description: result.description,
            image: result.imageUrl,
            licensing_authority: result.org
        }
        const insertCourse = await courseModel.insertCourse(course)
        console.log(insertCourse)
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
        else {
            res.json({
                code: 400,
                message: 'Insert Exam failed'
            })
        }
        // Loop through each question
        // exam.questions.forEach((question, questionIndex) => {
        //     console.log(`Question ${questionIndex + 1}: ${question.questionText}`);

        //     // Loop through each option in the current question
        //     question.options.forEach((option, optionIndex) => {
        //         console.log(`Option ${optionIndex + 1}: ${option.optionText}`);
        //     });

        //     console.log(`Correct Answer: ${question.correctAnswer}`);
        // });
    }
}