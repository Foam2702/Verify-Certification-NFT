const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        return tickets;
    },
    insertTicket: async (ticket) => {
        const maxIdResult = await sql`
        SELECT MAX(id) FROM ticket;
    `;
        const maxId = maxIdResult[0].max || 0; // Handle if there are no records in the table

        const result = await sql`
        INSERT INTO ticket (id, name, citizen_id, dob, region, city, verify, sign, issuer_address,cid_certificate)
        VALUES (
            ${maxId + 1},
            ${ticket.name},
            ${ticket.citizenId},
            ${ticket.dob},
            ${ticket.region},
            ${ticket.city},
            ${ticket.verify},
            ${ticket.sign},
            ${ticket.issuerAddress},
            ${ticket.cidCertificate}
        );
    `;
        return result;
    },
    getOneTicket: async (id) => {
        const result = await sql`SELECT  * FROM ticket WHERE id=${id};`;
        return result[0]
    }


}