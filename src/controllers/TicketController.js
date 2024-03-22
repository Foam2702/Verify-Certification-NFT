const ticketModel = require("../models/TicketModel")

module.exports = {
    getAllTicket: async (req, res, next) => {
        const ticket = await ticketModel.getAllTicket();
        res.json(ticket);
    },
    sendTicketFromStudent: async (req, res, next) => {
        const ticket = req.body;
        const parts = req.body.dob.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        ticket.dob = formattedDate;
        ticket.verify = false;
        ticket.sign = false;
        await ticketModel.insertTicket(ticket);
        res.json({
            "code": "200",
            "success": true,
            "message": "sent successfully"
        })
    }
}