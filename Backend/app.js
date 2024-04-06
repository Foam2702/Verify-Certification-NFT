const express = require("express")
const route = require("./src/routes/index")
const cors = require("cors")
const socket = require("./src/service/socket")
const app = express();
const PORT_SERVER = 8080;

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

route(app);
app.listen(PORT_SERVER, () => {
    console.log(`Starting at port:${PORT_SERVER}`)
})
socket.initServer(app)


