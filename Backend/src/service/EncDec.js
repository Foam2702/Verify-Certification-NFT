// import { ec as EC } from 'elliptic';
// import CryptoJS from 'crypto-js';
const { ec: EC } = require("elliptic");
const CryptoJS = require("crypto-js");
const ec = new EC('secp256k1');
async function encryptData(data, publicKeyHex) {
    const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');
    const fixedIV = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

    // Derive a shared secret using the public key
    const sharedKey = publicKey.getPublic().encode('hex'); // using public key as shared key
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);

    // Encrypt the data using AES-256-CBC with the fixed IV
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Hex.parse(key), { iv: fixedIV, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return {
        iv: fixedIV.toString(CryptoJS.enc.Hex),
        encryptedData: cipher.toString()
    };
}
async function decryptData(encryptedObject, privateKeyHex) {
    const { iv, encryptedData } = encryptedObject;
    const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
    const publicKey = privateKey.getPublic();

    // Derive the shared secret using the recipient's private key
    const sharedKey = publicKey.encode('hex'); // using public key as shared key
    const key = CryptoJS.SHA256(sharedKey).toString(CryptoJS.enc.Hex);

    // Decrypt the data using AES-256-CBC with the fixed IV
    const ivWordArray = CryptoJS.enc.Hex.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Hex.parse(key), { iv: ivWordArray, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });

    return decrypted.toString(CryptoJS.enc.Utf8);
}
function remove0x(input) {
    if (input.startsWith('0x')) {
        return input.slice(2);
    }
    return input;
}

module.exports = {
    encryptData,
    decryptData,
    remove0x
}