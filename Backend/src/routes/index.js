const ticketRouter = require("../routes/ticket")
const courseRouter = require("../routes/course")

function route(app) {
    app.use("/tickets", ticketRouter);
    app.use("/courses", courseRouter);
}
module.exports = route;