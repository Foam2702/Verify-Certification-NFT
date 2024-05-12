const express = require("express")
const route = require("./src/routes/index")
const cors = require("cors")
const socket = require("./src/service/socket")
const bodyParse = require("body-parser")
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

route(app);

socket.initServer(app)


