const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        console.log("TICKETS,", tickets)
        return tickets;
    },
    insertTicket: async (ticket) => {

        try {
            await sql`
        INSERT INTO ticket 
        (id,issuer_address, owner_address,certificate_cid,certificate_name,
        licensing_authority,name, citizen_id,gender,email, work_unit, region,status,dob,
           expiry_date,issue_date,point)
        VALUES (
            ${ticket.id},
            ${ticket.issuerAddress},
            ${ticket.owner},
            ${ticket.cidCertificate},
            ${ticket.certificateName},
            ${ticket.licensingAuthority},
            ${ticket.name},
            ${ticket.citizenId},
            ${ticket.gender},
            ${ticket.email},
            ${ticket.workUnit},
            ${ticket.region},
            ${ticket.status},
            ${ticket.dob},
            ${ticket.expiryDate},
            ${ticket.issueDate},
            ${ticket.point}
        );`;
            return true;
        }
        catch (err) {
            return err;
        }
    },
    getOneTicket: async (id, address) => {
        console.log(id)
        console.log(address)
        const result = await sql
            `SELECT  * FROM ticket WHERE (id=${id} 
            and issuer_address=${address}) or (id=${id} and owner_address=${address}) `;
        return result[0];
    },
    getAllCities: async () => {
        const cities = await sql`SELECT * FROM city;`;
        return cities;
    },
    getTicketFromOrg: async (org) => {
        const result = await sql
            `SELECT  * FROM ticket WHERE licensing_authority=${org} `;
        return result;
    },

    updateOneTicket: async (id, status, transaction_hash) => {
        transaction_hash = transaction_hash || null;
        try {
            await sql`UPDATE ticket SET status=${status} , transaction_hash=${transaction_hash} WHERE id=${id}`;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    deleteOneTicket: async (id) => {
        try {
            await sql`DELETE FROM ticket WHERE id=${id}`;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

}