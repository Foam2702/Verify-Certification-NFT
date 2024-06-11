import { useState, useEffect } from 'react';
import { decryptData } from '../helpers';
// Assuming decryptData is a function that decrypts the data and returns a promise
export const useDecryptTicket = (prop, ticket, privateKey) => {
    const [decrypted, setDecrypted] = useState('');

    useEffect(() => {
        const decrypt = async () => {
            if (ticket && prop && privateKey) {
                try {
                    const result = await decryptData(JSON.parse(prop), privateKey);
                    setDecrypted(result);
                } catch (error) {
                    console.error("Error decrypting ticket name:", error);
                    setDecrypted("Error decrypting name");
                }
            }
        };

        decrypt();
    }, [prop, ticket, privateKey]); // Dependencies for useEffect

    return decrypted;
};