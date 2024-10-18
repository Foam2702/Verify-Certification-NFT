// imageWorker.js
import { hashImage, isExistsInPinata, encryptData, add0x, decryptData, remove0x, imageUpload, fetchImagePinata, addFileToIPFS, imageFileToBase64, base64ToImageFile } from "../helpers";

self.onmessage = async (e) => {
    const { base64ImageString, privateKey, publicKeyOwner } = e.data;

    try {
        const hashImg = hashImage(base64ImageString);
        console.log("HASH", hashImg)
        const exists = await isExistsInPinata(hashImg);
        if (exists) {
            self.postMessage({ error: 'This certificate already belongs to someone else or you already get this certificate' });
            return;
        }

        const imageEncrypt = await encryptData(base64ImageString, privateKey, remove0x(publicKeyOwner));
        self.postMessage({ imageEncrypt, hashImg });
    } catch (error) {
        self.postMessage({ error: error.message });
    }
};
