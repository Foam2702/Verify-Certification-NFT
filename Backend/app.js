const express = require("express")
const app = express();
const PORT = 3001;
const route = require("./src/routes/index")
const cors = require("cors")
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());


route(app);
app.listen(PORT, () => {
    console.log(`Starting at port:${PORT}`)
})


