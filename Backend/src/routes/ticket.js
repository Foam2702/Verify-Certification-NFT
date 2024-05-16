const express = require("express")
const ticketController = require("../controllers/TicketController")
const router = express.Router();
const multer = require('multer')
const { dirname } = require('path');
const appDir = dirname(require.main.filename);
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appDir + '/public/img')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
});

router
    .route("/")
    .get(ticketController.getAllInfoTicket)
    .post(upload.single("imageCertificate"), ticketController.sendTicketFromStudent)
router
    .route("/ticket/:id")
    .get(ticketController.getOneTicket)
router
    .route("/all").get(ticketController.getAllTicket)
router.route("/:org").get(ticketController.getTicketFromOrg)
module.exports = router;