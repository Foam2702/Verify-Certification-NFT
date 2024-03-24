const { File, NFTStorage } = require('nft.storage');
const { formidable } = require("formidable")
const { readFileSync, unlinkSync } = require("fs")
const { tmpdir } = require("os")
const fs = require('fs').promises; // Import the 'fs' module

// read the API key from an environment variable. You'll need to set this before running the example!
const API_KEY = process.env.NFT_STORAGE_API_KEY
const client = new NFTStorage({ token: API_KEY })
const { dirname } = require('path');
const { Blockstore } = require("nft.storage/src/platform.js");
const appDir = dirname(require.main.filename);


// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
    const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
    const r = await fetch(imageOriginUrl)
    if (!r.ok) {
        throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
    }
    return r.blob()
}


async function storeExampleNFT(certificate) {
    const imagePath = certificate.path; // Assuming 'appDir' is defined elsewhere
    try {
        // Read the image file and create a Buffer
        const imageBuffer = await fs.readFile(imagePath);

        // Create a Blob from the Buffer
        const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' }); // Adjust the type according to your image format

        // Construct the NFT object with the Blob as the 'image' field
        const nft = {
            image: imageBlob,
            name: `Certificate of ${certificate.name}`,
            description: `Certificate of ${certificate.name}`
        };

        // Store the NFT metadata
        const metadata = await client.store(nft);

        return metadata.ipnft;
    } catch (error) {
        console.error('Error storing NFT:', error);
    }
}


module.exports = storeExampleNFT;