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
    .get(ticketController.getAllTicket)
    .post(upload.single("image_certificate"), ticketController.sendTicketFromStudent)
router
    .route("/:ticketId")
    .get(ticketController.getOneTicket)

module.exports = router;