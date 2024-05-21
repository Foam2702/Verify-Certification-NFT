
import axios from 'axios';
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