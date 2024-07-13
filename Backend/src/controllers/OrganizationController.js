const organizationModel = require("../models/OrganizationModel")

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
    }
}