const ticketRouter = require("../routes/ticket")
const courseRouter = require("../routes/course")
const homeRouter = require("../routes/home")
const adddressRouter = require("../routes/address")
function route(app) {
    app.use("/", homeRouter)
    app.use("/tickets", ticketRouter);
    app.use("/courses", courseRouter);
    app.use("/addresses", adddressRouter)
}
module.exports = route;