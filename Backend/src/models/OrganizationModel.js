const sql = require("../config/db")
module.exports = {
    getAllOrganization: async () => {
        const organizations = await sql`select * from certificate;`;
        return organizations;
    }
}