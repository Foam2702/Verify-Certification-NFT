const sql = require("../config/db")
const { deleteCertificate } = require("../controllers/CertificateController")
module.exports = {
    insertCertificate: async (certificate) => {
        try {
            const checkExist = await sql`SELECT * FROM certificate WHERE org=${certificate.org} AND certificate=${certificate.certificate}`

            if (checkExist.length > 0) {
                return false
            }

            await sql`INSERT INTO certificate VALUES (${certificate.org},${certificate.certificate})`
            return true

        }
        catch (err) {
            console.log(err)
            return false
        }

    }
    ,
    deleteCertificate: async (certificate, org) => {
        try {
            await sql`DELETE FROM certificate WHERE certificate=${certificate} AND org=${org}`
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    }
}
