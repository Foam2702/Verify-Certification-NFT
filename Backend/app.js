const express = require("express")
const route = require("./src/routes/index")
const cors = require("cors")
const socket = require("./src/service/socket")
const bodyParse = require("body-parser")
const app = express();

app.use(cors())

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

route(app);

socket.initServer(app)


