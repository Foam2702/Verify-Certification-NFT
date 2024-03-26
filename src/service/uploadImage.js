const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const JWT = process.env.JWT;


async function imageUpload(image) {
    try {
        const imagePath = image.path; // Assuming 'appDir' is defined elsewhere

        const formData = new FormData();

        const file = fs.createReadStream(imagePath);

        formData.append("file", file);

        const pinataMetadata = JSON.stringify({
            name: `certificate of ${image.name}`,
        });
        formData.append("pinataMetadata", pinataMetadata);

        const pinataOptions = JSON.stringify({
            cidVersion: 1,
        });
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

        return res.data.IpfsHash

    } catch (error) {
        console.log(error);
    }


}

module.exports = imageUpload;