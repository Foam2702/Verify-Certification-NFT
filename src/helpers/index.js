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
    // Generate a new ephemeral key pair
    const ephemeralKeyPair = ec.genKeyPair();
    const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');

    // Derive a shared secret using the ephemeral private key and the recipient's public key
    const sharedKey = ephemeralKeyPair.derive(publicKey.getPublic()).toString(16);
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);

    // Encrypt the data using AES-256-CBC
    const iv = CryptoJS.lib.WordArray.random(16);
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    // Return the ephemeral public key, IV, and encrypted data
    const ephemeralPublicKeyHex = ephemeralKeyPair.getPublic('hex');
    return {
        ephemeralPublicKey: ephemeralPublicKeyHex,
        iv: iv.toString(CryptoJS.enc.Hex),
        encryptedData: cipher.toString()
    };
}
export async function decryptData(encryptedObject, privateKeyHex) {
    const { ephemeralPublicKey, iv, encryptedData } = encryptedObject;
    const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
    const ephemeralPublic = ec.keyFromPublic(ephemeralPublicKey, 'hex');

    // Derive the shared secret using the recipient's private key and the ephemeral public key
    const sharedKey = privateKey.derive(ephemeralPublic.getPublic()).toString(16);
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);

    // Decrypt the data using AES-256-CBC
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


