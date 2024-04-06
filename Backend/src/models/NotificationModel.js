const sql = require("../config/db")
const table = "notification"
module.exports = {
    insertNotification: async (ticket, viewed, type) => {
        const maxIdResult = await sql`
        SELECT MAX(id) FROM notification
    `;

        const maxId = maxIdResult[0].max || 0;

        try {
            await sql`
            INSERT INTO notification (id,sender,certificate_cid,viewed,type,organization)
            VALUES(
                ${maxId + 1},
                ${ticket.owner},
                ${ticket.cidCertificate},
                ${viewed},
                ${type},
                ${ticket.licensingAuthority}
            )
            `

            return true;
        } catch (error) {
            return error
        }
    }

}