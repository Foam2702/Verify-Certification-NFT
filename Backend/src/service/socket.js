const { Server } = require('socket.io')
const { createServer } = require('node:http')
const { join } = require('node:path')
const PORT = 3001;
module.exports = {
    initServer(app) {
        const server = createServer(app)
        const io = new Server(server, {
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
        server.listen(PORT, () => {
            console.log(`Starting at port:${PORT}`)
        })

    }
}