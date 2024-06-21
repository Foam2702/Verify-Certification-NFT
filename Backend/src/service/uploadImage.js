const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

async function deleteFile(image) {
    try {
        fs.unlink(image.path, (err) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
    } catch (error) {
        console.log(error);
    }

}


module.exports = deleteFile;