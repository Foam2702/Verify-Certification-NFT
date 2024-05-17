const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        return tickets;
    },
    insertTicket: async (ticket) => {
        const maxIdResult = await sql`
        SELECT MAX(id) FROM ticket;
    `;
        const maxId = maxIdResult[0].max || 0; // Handle if there are no records in the table

        try {
            await sql`
            INSERT INTO ticket (id, owner_address, citizen_id, dob, name,certificate_cid, licensing_authority, 
            gender, email, work_unit, certificate_name, point, issue_date, expiry_date,region,status )
            VALUES (
            ${maxId + 1},
            ${ticket.owner},
            ${ticket.citizenId},
            ${ticket.dob},
            ${ticket.name},
            ${ticket.cidCertificate},
            ${ticket.licensingAuthority},
            ${ticket.gender},
            ${ticket.email},
            ${ticket.workUnit},
            ${ticket.certificateName},
            ${ticket.point},
            ${ticket.issueDate},
            ${ticket.expiryDate},
            ${ticket.region},
            ${ticket.status}
        );
    `;
            return true;
        }
        catch (err) {
            return err;
        }

    },
    getOneTicket: async (id) => {
        const result = await sql
            `SELECT  * FROM ticket WHERE id=${id} `;
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

    updateStatusOneTicket: async (id, status) => {
        try {
            await sql`UPDATE ticket SET status=${status} WHERE id=${id}`;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }



}