const sql = require("../config/db")

module.exports = {
    getAllShareCertificate: async (address) => {
        try {
            const result = await sql`SELECT * FROM share WHERE owner_address=${address}`;
            return result;
        }
        catch (err) {
            return err;
        }
    },
    getOneShareCertificate: async (id, address) => {
        const result = sql`
            SELECT * FROM share WHERE id=${id} and owner_address=${address}
        `
        return result;
    },
    insertShareCertificate: async (id, address, certificate) => {
        try {
            await sql`
            INSERT INTO share  VALUES (${id}, ${address},${certificate.certificate_image},${certificate.certificate_name},
            ${certificate.name},${certificate.issue_date}::timestamp without time zone,${certificate.expiry_date}::timestamp without time zone)
            `;
            return true;
        }
        catch (err) {
            console.log(err)
            return false
        }

    },
    deleteShareCertificate: async (id, address) => {
        try {
            await sql`DELETE FROM share WHERE id=${id} and owner_address=${address}`
            return true;
        }
        catch (err) {
            return false
        }
    }


}