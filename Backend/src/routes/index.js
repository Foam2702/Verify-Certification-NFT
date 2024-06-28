const ticketRouter = require("../routes/ticket")
const courseRouter = require("../routes/course")
const homeRouter = require("../routes/home")
const adddressRouter = require("../routes/address")
const examRouter = require("../routes/exam")
function route(app) {
    app.use("/", homeRouter)
    app.use("/tickets", ticketRouter);
    app.use("/courses", courseRouter);
    app.use("/addresses", adddressRouter)
    app.use("/exam", examRouter)
}
module.exports = route;