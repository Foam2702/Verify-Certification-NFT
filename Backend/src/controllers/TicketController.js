const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")
const splitDate = require("../service/splitDate")
const notificationModel = require("../models/NotificationModel")
const notificationService = require("../service/notification")
module.exports = {
    getAllTicket: async (req, res, next) => {
        const ticket = await ticketModel.getAllTicket();
        res.json(ticket);
    },
    sendTicketFromStudent: async (req, res, next) => {
        const ticket = req.body;
        const cidCertificate = "cidCertificate"
        const certificateUrl = "certificateUrl"
        let image = { ...ticket, ...req.file }
        if (ticket.point == '') {
            ticket.point = null
        }
        if (ticket.expiryDate == '') {
            ticket.expiryDate = null
        }
        else {
            ticket.expiryDate = splitDate(req.body.expiryDate);

        }
        ticket.dob = splitDate(req.body.dob);
        ticket.issueDate = splitDate(req.body.issueDate);
        ticket[cidCertificate] = await imageUpload(image);
        ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket[cidCertificate]}`
        //await notificationModel.insertNotification(ticket, false, "none")
        await notificationService.newTicketNotification(ticket)
        const result = await ticketModel.insertTicket(ticket);
        if (result == true) {
            res.json({
                "ticket": ticket,
                "code": "200",
                "success": true,
                "message": "sent successfully"
            })
        }
        else {
            res.json({
                "message": "ticket already exist",
                "code": "404",
                "success": false,
            })
        }
    },
    getOneTicket: async (req, res, next) => {
        const owner = req.query.owner_address;
        const cid = req.query.certificate_cid
        const ticket = await ticketModel.getOneTicket(owner, cid)
        if (ticket != undefined) {
            const certificateUrl = "certificateUrl"
            ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket.cid_certificate}`
            res.json(ticket)
        }
        else {
            res.json({
                "code": "404",
                "success": false,
                "message": "ticket doesn't exist"
            })
        }
    }

}