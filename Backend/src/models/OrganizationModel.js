const sql = require("../config/db")
module.exports = {
    getAllCertificates: async () => {
        const certificates = await sql`select * from certificate;`;
        return certificates;
    },
    getAllOrganization: async () => {
        const organizations = await sql`select * from organization;`;
        return organizations;
    },

    insertOrganization: async (org) => {
        try {
            await sql
                `insert into organization (org, image_licensing_authority) 
            values (${org.org}, ${org.image_licensing_authority});`;
            return true;
        }
        catch (err) {
            return false
        }

    },
    deleteOneOrganization: async (org) => {
        try {
            await sql`delete from organization where org = ${org};`;
            return true;
        }
        catch (err) {
            return false
        }
    },
    deleteOneCertificate: async (org) => {
        try {
            await sql`delete from certificate where org = ${org};`;
            return true;
        }
        catch (err) {
            return false
        }
    }
}