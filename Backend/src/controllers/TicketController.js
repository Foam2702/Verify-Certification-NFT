const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")
const splitDate = require("../service/splitDate")
const encDecData = require("../service/EncDec")
const notificationModel = require("../models/NotificationModel")
const notificationService = require("../service/notification")
const organizationModel = require("../models/OrganizationModel")
const addressModel = require("../models/AddressModel")
const deleteFile = require("../service/uploadImage")
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
        if (req.file)
            deleteFile(req.file)
        const status = "status"
        ticket[status] = "processing"
        console.log(ticket)
        if (ticket.point == 'null') {
            ticket.point = null;
        }
        if (ticket.expiryDate == 'null') {
            ticket.expiryDate = null;

        }
        const result = await ticketModel.insertTicket(ticket);
        if (result === true) {
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
        const { address } = req.query
        const ticket = await ticketModel.getOneTicket(id, address)
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
        const certificates = await organizationModel.getAllCertificates();
        res.json({
            "code": "200",
            "status": "success",
            cities, certificates
        }
        )

    },
    getTicketFromOrg: async (req, res) => {
        const { org } = req.params
        const tickets = await ticketModel.getTicketFromOrg(org)
        res.json({
            "code": "200",
            "success": true,
            "tickets": tickets
        })
    },
    getTicketsByAddress: async (req, res) => {
        const { address } = req.query
        const tickets = await ticketModel.getTicketsByAddress(address)
        res.json({
            "code": "200",
            "success": true,
            "tickets": tickets
        })
    },
    updateOneTicket: async (req, res) => {
        const { id } = req.params
        const { status, transaction_hash, issuer_address } = req.query

        const result = await ticketModel.updateOneTicket(id, status, transaction_hash)
        if (result == true) {
            // await ticketModel.deleteTicketExceptUser(id)
            res.json({
                "code": "200",
                "success": true,
                "message": "updated successfully"
            })
        }
        else {
            res.json({
                "code": "404",
                "success": false,
                "message": "update failed"
            })
        }
    },
    deleteOneTicket: async (req, res) => {
        const { id } = req.params
        const { address } = req.query
        const result = await ticketModel.deleteTicketByIdAndAddress(id, address)
        if (result == true) {
            res.json({
                "code": "200",
                "success": true,
                "message": "deleted successfully"
            })
        }
        else {
            res.json({
                "code": "404",
                "success": false,
                "message": "delete failed"
            })
        }

    },
    deleteOneTicketByAddress: async (req, res) => {
        const { address } = req.query
        const result = await ticketModel.deleteOneTicketByAddress(address)
        if (result == true) {
            res.json({
                "code": "200",
                "success": true,
                "message": "deleted successfully"
            })
        }
        else {
            res.json({
                "code": "404",
                "success": false,
                "message": "delete failed"
            })
        }
    }


}