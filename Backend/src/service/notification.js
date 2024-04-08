const socket = require("../service/socket")

module.exports = {
    newTicketNotification: async (ticket) => {
        console.log("IN new ticket noti")
        socket.sendNotice(ticket)
    }
}