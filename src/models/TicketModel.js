const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`SELECT * FROM ticket;`;
        return tickets;
    }
}