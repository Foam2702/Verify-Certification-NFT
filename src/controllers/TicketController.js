const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")
module.exports = {
    getAllTicket: async (req, res, next) => {
        const ticket = await ticketModel.getAllTicket();
        res.json(ticket);
    },
    sendTicketFromStudent: async (req, res, next) => {
        const ticket = req.body;
        const parts = req.body.dob.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        const cidCertificate = "cidCertificate"
        const certificateUrl = "certificateUrl"

        if (ticket.hashData == "" && ticket.signature == "") {
            ticket.verify = false;
            ticket.sign = false;
        }
        else {
            ticket.verify = true;
            ticket.sign = true;
        }
        let image = { ...ticket, ...req.file }

        ticket.dob = formattedDate;
        ticket.issuerAddress = ticket.issuerAddress.substring(2);
        ticket[cidCertificate] = await imageUpload(image);
        ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket[cidCertificate]}`

        await ticketModel.insertTicket(ticket);

        res.json({
            "ticket": ticket,
            "code": "200",
            "success": true,
            "message": "sent successfully"
        })
    },
    getOneTicket: async (req, res, next) => {
        const id = req.params.ticketId
        const ticket = await ticketModel.getOneTicket(id)
        const certificateUrl = "certificateUrl"
        ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket.cid_certificate}`

        res.json(ticket)
    }

}