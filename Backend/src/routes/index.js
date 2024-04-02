const ticketRouter = require("../routes/ticket")


function route(app) {
    app.use("/tickets", ticketRouter);
}
module.exports = route;