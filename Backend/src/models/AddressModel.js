
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
        try {
            const addressExist = await sql`SELECT * FROM address where address=${address}`
            if (addressExist.length == 0) {
                await sql`
            INSERT INTO address (address, publickey) VALUES (${address}, ${pub})
            `;
                return true;

            }
            else if (addressExist.length != 0) {
                await sql`UPDATE address SET publickey =${pub} WHERE address=${address}`
                return true
            }

        }
        catch (err) {
            return err
        }

    },
    insertAddress: async (address) => {
        try {
            await sql`
            INSERT INTO address (address) VALUES (${address})
            `;
            return true;
        } catch (err) {
            return err
        }
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
    },
    deleteAddress: async (address) => {
        try {
            await sql`
            DELETE FROM address WHERE address=${address}
            `;
            return true;
        } catch (err) {
            return false
        }
    }
}