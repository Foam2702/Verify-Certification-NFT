const express = require("express")
const route = require("./src/routes/index")
const cors = require("cors")
const { Server } = require('socket.io')
const { createServer } = require('node:http')
const { join } = require('node:path')
const app = express();
const PORT = 3001;
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
//route(app);
server.listen(PORT, () => {
    console.log(`Starting at port:${PORT}`)
})

