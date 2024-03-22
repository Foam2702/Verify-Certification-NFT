const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        return tickets;
    },
    insertTicket: async (ticket) => {
        const maxId = await sql`
        SELECT MAX(id) FROM ticket;
    `;


        const result = await sql`
        INSERT INTO ticket (id, name, citizen_id, dob, region, city,verify,sign)
        VALUES (
            ${maxId[0].max + 1},
            ${ticket.name},
            ${ticket.citizenId},
            ${ticket.dob},
            ${ticket.region},
            ${ticket.city},
            ${ticket.verify},
            ${ticket.sign}
        );
    `;

        return result;
    }

}