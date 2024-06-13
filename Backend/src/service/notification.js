const socket = require("../service/socket")

module.exports = {
    newTicketNotification: async (ticket) => {
        socket.sendNotice(ticket)
    }
}