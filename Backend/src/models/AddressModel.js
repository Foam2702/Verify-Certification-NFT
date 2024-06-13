
const sql = require("../config/db")

module.exports = {
    getAddressesPub: async () => {
        try {
            const addresses = await sql`SELECT * FROM address`;
            return addresses;
        }
        catch (err) {
            return err;
        }

    },
    getOneAddressPub: async (address) => {
        const result = sql`
            SELECT * FROM address WHERE address=${address}
        `
        return result;
    },
    insertAddressPub: async (address, pub) => {

        const result = await sql`
            INSERT INTO address (address, publickey) VALUES (${address}, ${pub})
        `;
        return result;
    },
    updateAddressPub: async (id, address) => {
        const result = await sql`
            UPDATE address SET address=${address} WHERE id=${id}
        `;
        return result;
    },
    deleteAddressPub: async (id) => {
        const result = await sql`
            DELETE FROM address WHERE id=${id}
        `;
        return result;
    }
}