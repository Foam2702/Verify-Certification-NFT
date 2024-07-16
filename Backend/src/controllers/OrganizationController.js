const organizationModel = require("../models/OrganizationModel")
const courseModel = require("../models/CourseModel")
const ticketModel = require("../models/TicketModel")
const examModel = require("../models/ExamModel")
module.exports = {
    getAllOrganization: async (req, res) => {
        const organization = await organizationModel.getAllOrganization()
        res.json({
            code: 200,
            org: organization
        })
    },

    insertOrganization: async (req, res) => {
        console.log(req.body)
        const organization = {
            org: req.body.newOrganization,
            image_licensing_authority: req.body.imageUrl
        }
        console.log(organization)
        const result = await organizationModel.insertOrganization(organization)
        if (result) {
            res.json({
                code: 200,
                message: "insert success"
            })
        }
        else {
            res.json({
                code: 404,
                message: "insert fail"
            })
        }
    },
    deleteOneOrganization: async (req, res) => {
        const { org } = req.query
        await organizationModel.deleteOneCertificate(org)
        const all_courses_by_org = await courseModel.getCourseByOrg(org)
        for (let i = 0; i < all_courses_by_org.length; i++) {
            await courseModel.deleteQuestionByCourseId(all_courses_by_org[i].id)
            await examModel.deleteExamById(all_courses_by_org[i].id)
        }
        await courseModel.deleteOneCourseByOrg(org)
        await ticketModel.deleteTicketByOrg(org)
        const result = await organizationModel.deleteOneOrganization(org)

        if (result == true) {
            res.json({
                code: 200,
                message: "delete success"
            })
        }
        else {
            res.json({
                code: 404,
                message: "delete fail"
            })
        }
    }
}