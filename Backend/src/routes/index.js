const ticketRouter = require("../routes/ticket")
const courseRouter = require("../routes/course")
const homeRouter = require("../routes/home")
const adddressRouter = require("../routes/address")
const examRouter = require("../routes/exam")
const organizationRouter = require("../routes/organization")
const shareRouter = require("../routes/share")
const certificateRouter = require("../routes/certificate")
function route(app) {
    app.use("/", homeRouter)
    app.use("/tickets", ticketRouter);
    app.use("/courses", courseRouter);
    app.use("/addresses", adddressRouter)
    app.use("/exam", examRouter)
    app.use("/organization", organizationRouter)
    app.use("/share", shareRouter)
    app.use("/certificate", certificateRouter)
}
module.exports = route;