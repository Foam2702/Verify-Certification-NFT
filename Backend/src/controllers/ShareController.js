const shareModel = require("../models/ShareModel")

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
        console.log(address)
        console.log(id)
        console.log(certificate)
        if (certificate.issue_date == null || certificate.issue_date == ' ') {
            certificate.issue_date = null
        }
        else {
            const dateObject = new Date(certificate.issue_date);
            certificate.issue_date = dateObject;
        }
        if (certificate.expiry_date == null || certificate.expiry_date == ' ') {
            certificate.expiry_date = null

        }
        else {
            const dateObject = new Date(certificate.expiry_date);
            certificate.expiry_date = dateObject;
        }
        console.log(certificate)
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