const shareModel = require("../models/ShareModel")
const formatDate = require("../service/formatDate")
module.exports = {
    getAllShareCertificate: async (req, res) => {
        const { address } = req.query
        const result = await shareModel.getAllShareCertificate(address)
        res.json({
            status: "success",
            data: result
        })
    },
    getOneShareCertificate: async (req, res) => {
        const { address } = req.query
        const { id } = req.params
        const result = await shareModel.getOneShareCertificate(id, address)
        res.json({
            status: "success",
            data: result
        })

    },
    insertShareCertificate: async (req, res) => {
        const { id, address } = req.query
        const certificate = req.body

        if (certificate.issue_date == null || certificate.issue_date == ' ') {
            certificate.issue_date = null
        }
        else {
            certificate.issue_date = formatDate(certificate.issue_date)
        }
        if (certificate.expiry_date == null || certificate.expiry_date == ' ') {
            certificate.expiry_date = null

        }
        else {
            certificate.expiry_date = formatDate(certificate.expiry_date);
        }
        const result = await shareModel.insertShareCertificate(id, address, certificate)
        // const result = true
        if (result == true) {
            res.json({
                status: "success",
                message: "Change to public success"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Change to public failed"
            })
        }

    },
    deleteShareCertificate: async (req, res) => {
        const { id, address } = req.query
        const result = await shareModel.deleteShareCertificate(id, address)
        if (result == true) {
            res.json({
                status: "success",
                message: "Change to private success"
            })
        }
        else {
            res.json({
                status: "failed",
                message: "Change to private failed"
            })
        }
    }
}