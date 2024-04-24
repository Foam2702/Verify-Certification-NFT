const { Server } = require('socket.io')
const { createServer } = require('node:http')
const { join } = require('node:path')
const PORT = process.env.PORT || 5001;
const _ = require("lodash")
let io = null;
let onlineUsers = []
const registerAuth = () => {
    io.on('connection', (socket) => {
        console.log("new connection", socket.id)
        socket.on("addNewUser", (userId) => {
            !onlineUsers.some(user => user.userId === userId) &&
                onlineUsers.push({
                    userId,
                    socketId: socket.id
                })
            console.log("onlineUsers ", onlineUsers)
            io.emit("getOnlineUsers", onlineUsers)
        })
        socket.on("disconnect", () => {
            onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id)
            io.emit("getOnlineUsers", onlineUsers)

        })
    })
}
const sendNotice = async (ticket) => {
    console.log("IN SEND NOTICE")
    const issuer = "0x0f670Fdb84de5356B14000297668be50675A79eA"
    const sockets = await io.in('authenticated').fetchSockets();
    console.log("SOCKET", sockets)
    _.each(sockets, (socket) => {
        if (socket.user == issuer) {
            console.log("NOTICE SUCCEED")
            socket.emit('notice', ticket.cidCertificate)
            console.log("NOTICE SUCCEED")

        }
    })

}
module.exports = {
    initServer(app) {
        const server = createServer(app)
        io = new Server(server, {
            connectionStateRecovery: {},
            cors: "http://localhost:3000"
        })
        registerAuth();
        server.listen(PORT, () => {
            console.log(`Starting at port:${PORT}`)
        })

    },
    sendNotice
}