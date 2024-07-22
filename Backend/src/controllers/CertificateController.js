const certificateModel = require("../models/CertificateModel")
module.exports = {
    insertCertificate: async (req, res) => {
        const certificate = req.body
        console.log(certificate)
        const result = await certificateModel.insertCertificate(certificate)
        if (result) {
            res.json({ message: "Certificate inserted" })

        }
        else {
            res.json({ message: "Certificate already exists" })

        }
    },
    deleteCertificate: async (req, res) => {
        const { certificate, org } = req.query
        console.log(certificate, org)
        const result = await certificateModel.deleteCertificate(certificate, org)
        if (result) {
            res.json({ message: "Certificate deleted" })

        }
        else {
            res.json({ message: "Certificate not found" })

        }
    }
}