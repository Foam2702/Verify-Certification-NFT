const express = require("express")
const ticketContronller = require("../controllers/TicketController")
const router = express.Router();

router.route("/all").get(ticketContronller.getAllTicket)

module.exports = router;