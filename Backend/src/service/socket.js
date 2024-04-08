const { Server } = require('socket.io')
const { createServer } = require('node:http')
const { join } = require('node:path')
const PORT = 8080;
const _ = require("lodash")
let io = null;
const registerAuth = () => {
    io.on('connection', (socket) => {
        console.log("authenticate")
        socket.user = "0x0f670Fdb84de5356B14000297668be50675A79eA"
        socket.orginazation = "HCMUS"
        socket.join('authenticated')

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
            cors: {
                origin: '*',
                optionsSuccessStatus: 200

            }
        })
        io.on('connection', (socket) => {
            socket.on('chat message', (msg) => {
                io.emit('chat message', msg);
            });
        });
        app.get('/', (req, res) => {
            res.sendFile(join(
                'D:\\University of Science\\IT\\University\\Code\\4th_2\\DTTN\\Verify-Certification-NFT\\Backend',
                'index.html'))
        })
        registerAuth();
        server.listen(PORT, () => {
            console.log(`Starting at port:${PORT}`)
        })

    },
    sendNotice
}