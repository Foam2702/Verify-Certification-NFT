const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        return tickets;
    },
    insertTicket: async (ticket) => {
        console.log("IM HERE")
        const maxIdResult = await sql`
        SELECT MAX(id) FROM ticket;
    `;
        const maxId = maxIdResult[0].max || 0; // Handle if there are no records in the table

        try {
            await sql`
            INSERT INTO ticket (id, owner_address, citizen_id, dob, name,certificate_cid, licensing_authority, 
            gender, email, work_unit, certificate_name, point, issue_date, expiry_date,region )
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
            ${ticket.region}
        );
    `;
            return true;
        }
        catch (err) {
            return err;
        }

    },
    getOneTicket: async (owner, cid) => {
        const result = await sql
            `SELECT  * FROM ticket WHERE owner_address=${owner} 
        and certificate_cid=${cid};`;
        console.log(result)
        return result[0];
    }


}