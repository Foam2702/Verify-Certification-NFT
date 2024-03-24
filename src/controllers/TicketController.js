const ticketModel = require("../models/TicketModel")
const imageUpload = require("../service/uploadImage")

module.exports = {
    getAllTicket: async (req, res, next) => {
        const ticket = await ticketModel.getAllTicket();
        // console.log(ticket)
        for (let i = 0; i < ticket.length; i++) {
            if (ticket[i].issuer_address != null) {
                const issuerAddressBuffer = Buffer.from(ticket[i].issuer_address, 'hex');
                const issuerAddressHexString = '0x' + issuerAddressBuffer.toString('hex');
                ticket[i].issuer_address = issuerAddressHexString;
            }
        }
        res.json(ticket);
    },
    sendTicketFromStudent: async (req, res, next) => {
        const ticket = req.body;
        const parts = req.body.dob.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
        ticket.dob = formattedDate;
        ticket.issuerAddress = ticket.issuerAddress.substring(2);
        if (ticket.hashData == "" && ticket.signature == "") {
            ticket.verify = false;
            ticket.sign = false;
        }
        else {
            ticket.verify = true;
            ticket.sign = true;
        }
        const result = JSON.parse(JSON.stringify(req.body));
        let image = { ...result, ...req.file }
        const cidCertificate = await imageUpload(image);
        const prop_name = "cidCertificate"
        result[prop_name] = cidCertificate
        console.log(result);

        await ticketModel.insertTicket(result);

        res.json({
            "ticket": result,
            "code": "200",
            "success": true,
            "message": "sent successfully"
        })
    }
}