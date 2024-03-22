const ticketModel = require("../models/TicketModel")

module.exports = {
    getAllTicket: async (req, res, next) => {
        const ticket = await ticketModel.getAllTicket();
        res.json(ticket);
    }
}