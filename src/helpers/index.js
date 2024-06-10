
import axios from 'axios';
const { ec: EC } = require('elliptic');
const crypto = require('crypto');

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

export function encryptData(data, publicKeyHex) {
    // Generate a new ephemeral key pair
    const ephemeralKeyPair = ec.genKeyPair();
    const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');

    // Derive a shared secret using the ephemeral private key and the recipient's public key
    const sharedKey = ephemeralKeyPair.derive(publicKey.getPublic()).toString(16);
    const key = crypto.createHash('sha256').update(sharedKey).digest();
    console.log('Khóa chia sẻ khi mã hóa:', sharedKey); // Kiểm tra khóa chia sẻ khi mã hóa

    // Encrypt the data using AES-256-CBC
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the ephemeral public key, IV, and encrypted data
    const ephemeralPublicKeyHex = ephemeralKeyPair.getPublic('hex');
    return {
        ephemeralPublicKey: ephemeralPublicKeyHex,
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

export function decryptData(encryptedObject, privateKeyHex) {
    const { ephemeralPublicKey, iv, encryptedData } = encryptedObject;
    const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
    const ephemeralPublic = ec.keyFromPublic(ephemeralPublicKey, 'hex');

    // Derive the shared secret using the recipient's private key and the ephemeral public key
    const sharedKey = privateKey.derive(ephemeralPublic.getPublic()).toString(16);
    const key = crypto.createHash('sha256').update(sharedKey).digest();
    console.log('Khóa chia sẻ khi giải mã:', sharedKey); // Kiểm tra khóa chia sẻ khi giải mã

    // Decrypt the data using AES-256-CBC
    const ivBuffer = Buffer.from(iv, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuffer);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}


