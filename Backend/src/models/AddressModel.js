
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
    },
    updateInfo: async (address, user) => {
        try {
            await sql`
            UPDATE address 
            SET name=${user.name},citizen_id=${user.citizenId},
                gender=${user.gender},email=${user.email},
                work_unit=${user.workUnit},region=${user.region},dob=${user.dob}
            WHERE address=${address}
            `;
            return true;
        }
        catch (err) {
            return err
        }


    }
}