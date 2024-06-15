const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")
const splitDate = require("../service/splitDate")
const encDecData = require("../service/EncDec")
const notificationModel = require("../models/NotificationModel")
const notificationService = require("../service/notification")
const organizationModel = require("../models/OrganizationModel")
const addressModel = require("../models/AddressModel")
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
        const status = "status"
        let getAddress = "";

        // Function to check and convert empty or 'null' values to null
        const convertToNullIfEmptyOrNull = (value) => {
            return (value === '' || value === 'null') ? null : value;
        };

        // Apply the conversion function to all relevant properties
        ticket.point = convertToNullIfEmptyOrNull(ticket.point);
        ticket.expiryDate = convertToNullIfEmptyOrNull(ticket.expiryDate);
        ticket.issuerAddress = convertToNullIfEmptyOrNull(ticket.issuerAddress);
        // Add similar lines for other properties if needed

        ticket[status] = "processing"
        // await notificationModel.insertNotification(ticket, false, "none")
        // await notificationService.newTicketNotification(ticket)
        // const result = await ticketModel.insertTicket(ticket);
        if (ticket.issuerAddress === null) {
            getAddress = await addressModel.getOneAddressPub(ticket.owner)
        }
        else {
            getAddress = await addressModel.getOneAddressPub(ticket.issuerAddress)
        }

        const encTicket = {
            citizenId: JSON.stringify(await encDecData.encryptData(ticket.citizenId, encDecData.remove0x(getAddress[0].publickey))),
            name: JSON.stringify(await encDecData.encryptData(ticket.name, encDecData.remove0x(getAddress[0].publickey))),
            region: JSON.stringify(await encDecData.encryptData(ticket.region, encDecData.remove0x(getAddress[0].publickey))),
            dob: JSON.stringify(await encDecData.encryptData(ticket.dob, encDecData.remove0x(getAddress[0].publickey))),
            gender: JSON.stringify(await encDecData.encryptData(ticket.gender, encDecData.remove0x(getAddress[0].publickey))),
            email: JSON.stringify(await encDecData.encryptData(ticket.email, encDecData.remove0x(getAddress[0].publickey))),
            workUnit: JSON.stringify(await encDecData.encryptData(ticket.workUnit, encDecData.remove0x(getAddress[0].publickey))),
            point: JSON.stringify(await encDecData.encryptData(ticket.point, encDecData.remove0x(getAddress[0].publickey))),
            issueDate: JSON.stringify(await encDecData.encryptData(ticket.issueDate, encDecData.remove0x(getAddress[0].publickey))),
            expiryDate: JSON.stringify(await encDecData.encryptData(ticket.expiryDate, encDecData.remove0x(getAddress[0].publickey))),
            certificateName: ticket.certificateName,
            owner: ticket.owner,
            licensingAuthority: ticket.licensingAuthority,
            issuerAddress: ticket.issuerAddress,
            cidCertificate: ticket.cidCertificate,
            id: ticket.id,
            status: ticket.status
        }
        console.log(encTicket)

        const result = await ticketModel.insertTicket(encTicket);
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
        console.log(id, address)
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
        const certificates = await organizationModel.getAllOrganization();
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
    updateOneTicket: async (req, res) => {
        const { id } = req.params
        const { status, transaction_hash } = req.query
        const ticketFromDb = await ticketModel.getOneTicket(id)
        if (ticketFromDb == undefined) {
            res.json({
                "code": "404",
                "success": false,
                "message": "ticket doesn't exist"
            })
        }
        else {
            if (ticketFromDb.status === status) {
                res.json({
                    "code": 404,
                    "status": false,
                    "message": `Already ${status}`
                })
            }
            else {
                const result = await ticketModel.updateOneTicket(id, status, transaction_hash)
                if (result == true) {
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
            }
        }
    },
    deleteOneTicket: async (req, res) => {
        const { id } = req.params
        const ticket = await ticketModel.getOneTicket(id)
        if (ticket == undefined) {
            res.json({
                "code": "404",
                "success": false,
                "message": "ticket doesn't exist"
            })
        }
        else {
            const result = await ticketModel.deleteOneTicket(id)
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


}