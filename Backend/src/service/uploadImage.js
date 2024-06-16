const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = process.env.JWT;

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
async function imageUpload(image) {
    try {
        const imagePath = image.path; // Assuming 'appDir' is defined elsewhere
        const formData = new FormData();
        const file = fs.createReadStream(imagePath);
        const pinataMetadata = JSON.stringify({
            name: `certificate of ${image.owner}`,
        });
        const pinataOptions = JSON.stringify({
            cidVersion: 1,
        });
        formData.append("file", file);
        formData.append("pinataMetadata", pinataMetadata);
        formData.append("pinataOptions", pinataOptions);
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
                headers: {
                    Authorization: `Bearer ${JWT}`,
                },
            }
        );
        fs.unlink(image.path, (err) => {
            if (err) {
                console.error(err);
            } else {
            }
        });
        return res.data.IpfsHash
    } catch (error) {
        console.log(error);
    }


}

module.exports = imageUpload;