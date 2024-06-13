import axios from 'axios';
import { ec as EC } from 'elliptic';
import CryptoJS from 'crypto-js';
const ec = new EC('secp256k1');
const JWT = process.env.REACT_APP_JWT; // Make sure to set this in your React app environment variables
export const minifyAddress = (address) => {
    const start = address.substring(0, 5);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
};

export function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
export const pinJSONToIPFS = async (ticket) => {
    const data = JSON.stringify({
        pinataContent: {
            name: `${ticket.name}`,
            description: `${ticket.certificate_name}`,
            external_url: "https://pinata.cloud",
            image: `ipfs://${ticket.certificate_cid}`,
            attributes: [
                { "trait_type": "citizen_id", "value": `${ticket.citizen_id}` },
                { "trait_type": "owner_address", "value": `${ticket.owner_address}` },
                { "trait_type": "dob", "value": `${ticket.dob}` },
                { "trait_type": "licensing_authority", "value": `${ticket.licensing_authority}` },
                { "trait_type": "gender", "value": `${ticket.gender}` },
                { "trait_type": "email", "value": `${ticket.email}` },
                { "trait_type": "work_unit", "value": `${ticket.work_unit}` },
                { "trait_type": "issue_date", "value": `${ticket.issue_date}` },
                { "trait_type": "region", "value": `${ticket.region}` },
                { "trait_type": "status", "value": `${ticket.status}` },

            ]
        },
        pinataMetadata: {
            name: "metadata.json"
        }
    });

    try {
        console.log("JWT", JWT)
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JWT}`
            }
        });
        console.log("RES", res.data)
        return (res.data.IpfsHash);
    } catch (error) {
        console.log(error);
    }
};

export function replaceBaseUrl(ipfsLink, newBaseUrl) {
    const ipfsHash = ipfsLink.split('/').pop();
    return `${newBaseUrl}/ipfs/${ipfsHash}`;
}

export async function encryptData(data, publicKeyHex) {
    const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');
    const fixedIV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

    // Derive a shared secret using the public key
    const sharedKey = publicKey.getPublic().encode('hex'); // using public key as shared key
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);
    console.log('Khóa chia sẻ khi mã hóa:', sharedKey); // Kiểm tra khóa chia sẻ khi mã hóa

    // Encrypt the data using AES-256-CBC with the fixed IV
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), { iv: fixedIV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return {
        iv: fixedIV.toString(CryptoJS.enc.Hex),
        encryptedData: cipher.toString()
    };
}
export async function decryptData(encryptedObject, privateKeyHex) {
    const { iv, encryptedData } = encryptedObject;
    const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
    const publicKey = privateKey.getPublic();

    // Derive the shared secret using the recipient's private key
    const sharedKey = publicKey.encode('hex'); // using public key as shared key
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);
    console.log('Khóa chia sẻ khi giải mã:', sharedKey); // Kiểm tra khóa chia sẻ khi giải mã

    // Decrypt the data using AES-256-CBC with the fixed IV
    const ivWordArray = CryptoJS.enc.Hex.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(key), { iv: ivWordArray, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
export function remove0x(input) {
    if (input.startsWith('0x')) {
        return input.slice(2);
    }
    return input;
}
export function extractEncryptedDataFromJson(jsonString) {
    try {
        const obj = JSON.parse(jsonString);
        return obj.encryptedData || 'Encrypted data not found';
    } catch (error) {
        console.error('Error parsing JSON:', error);
        return null;
    }
}

export async function fetchData(url) {
    try {
        const response = await axios.get(url);
        console.log(response);
        return response; // Process the response data as needed
    } catch (error) {
        handleError(error);
    }
}
export function handleError(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
    } else if (error.isAxiosError) {
        // Error specific to axios request
        console.error("Axios error:", error.message);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
    }
}

export async function imageUpload(image, owner) {
    try {
        const formData = new FormData();
        const pinataMetadata = JSON.stringify({
            name: `certificate of ${owner}`,
        });
        const pinataOptions = JSON.stringify({
            cidVersion: 1,
        });
        formData.append("file", image);
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

        return res.data.IpfsHash
    } catch (error) {
        console.log(error);
    }
}

export async function fetchImagePinata() {
    const res = await axios(
        "https://api.pinata.cloud/data/pinList?status=all&pageLimit=100",
        {
            headers: {
                Authorization: `Bearer ${JWT}`,
            },
        }
    );

    return res.data.rows
}







