const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")
const splitDate = require("../service/splitDate")
const notificationModel = require("../models/NotificationModel")
const notificationService = require("../service/notification")
const organizationModel = require("../models/Organization")
const fs = require('fs')

module.exports = {
    getAllTicket: async (req, res, next) => {
        const tickets = await ticketModel.getAllTicket();
        res.json({
            "code": "200",
            "success": true,
            "tickets": tickets,
        });
    },
    sendTicketFromStudent: async (req, res, next) => {
        const ticket = req.body;
        //console.log(ticket)

        const cidCertificate = "cidCertificate"
        const certificateUrl = "certificateUrl"
        const status = "status"
        let image = { ...ticket, ...req.file }
        console.log(image)
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

        ticket[status] = "processing"

        ticket[cidCertificate] = await imageUpload(image);
        ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket[cidCertificate]}`
        await notificationModel.insertNotification(ticket, false, "none")
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
        const { id } = req.params
        const ticket = await ticketModel.getOneTicket(id)
        console.log(ticket)
        if (ticket != undefined) {
            const certificateUrl = "certificateUrl"
            ticket[certificateUrl] = `https://coral-able-takin-320.mypinata.cloud/ipfs/${ticket.certificate_cid}`
            res.json({
                "code": "200",
                "success": true,
                "ticket": ticket
            })

        }
        else {
            res.json({
                "code": "404",
                "success": false,
                "message": "ticket doesn't exist"
            })
        }
    },
    getAllInfoTicket: async (req, res) => {
        const cities = await ticketModel.getAllCities();
        const certificates = await organizationModel.getAllOrganization();
        res.json({
            "code": "200",
            "status": "success",
            cities, certificates
        }
        )

    }

}