const express = require("express")
const ticketController = require("../controllers/TicketController")
const router = express.Router();

router.route("/")
    .get(ticketController.getAllTicket)
    .post(ticketController.sendTicketFromStudent)

module.exports = router;