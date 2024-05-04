const ticketRouter = require("../routes/ticket")
const courseRouter = require("../routes/course")
const homeRouter = require("../routes/home")
function route(app) {
    app.use("/", homeRouter)
    app.use("/tickets", ticketRouter);
    app.use("/courses", courseRouter);
}
module.exports = route;