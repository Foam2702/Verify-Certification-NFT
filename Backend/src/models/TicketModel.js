const sql = require("../config/db")

module.exports = {
    getAllTicket: async () => {
        const tickets = await sql`select * from ticket;`;
        return tickets;
    },
    insertTicket: async (ticket) => {
        try {
            const checkExist = await sql`SELECT * FROM ticket WHERE owner_address= ${ticket.owner}`;
            let isDuplicate = false;
            if (checkExist.length > 0) {
                isDuplicate = checkExist.some(existingTicket =>
                    existingTicket.owner_address === ticket.owner &&
                    existingTicket.certificate_cid === ticket.cidCertificate &&
                    existingTicket.certificate_name === ticket.certificateName &&
                    existingTicket.licensing_authority === ticket.licensingAuthority &&
                    existingTicket.name === ticket.name &&
                    existingTicket.citizen_id === ticket.citizenId &&
                    existingTicket.gender === ticket.gender &&
                    existingTicket.email === ticket.email &&
                    existingTicket.work_unit === ticket.workUnit &&
                    existingTicket.region === ticket.region &&
                    existingTicket.status === ticket.status &&
                    existingTicket.dob === ticket.dob &&
                    existingTicket.expiry_date === ticket.expiryDate &&
                    existingTicket.issue_date === ticket.issueDate &&
                    existingTicket.point === ticket.point
                );
            }
            else {
                await sql`
                    INSERT INTO ticket 
                    VALUES (
                        ${ticket.id},
                        ${ticket.issuerAddress},
                        ${ticket.owner},
                        ${ticket.cidCertificate},
                        ${ticket.certificateName},
                        ${ticket.licensingAuthority},
                        null,
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
                return true; // Indicates a duplicate was found and the insert was not performed
            }
            if (isDuplicate == false) {
                await sql`
                    INSERT INTO ticket 
              
                    VALUES (
                        ${ticket.id},
                        ${ticket.issuerAddress},
                        ${ticket.owner},
                        ${ticket.cidCertificate},
                        ${ticket.certificateName},
                        ${ticket.licensingAuthority},
                        null,
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
            else {
                return false
            }
        } catch (err) {
            return err;
        }

    },
    getOneTicket: async (id, address) => {

        const result = await sql
            `SELECT  * FROM ticket WHERE (id=${id} 
            and issuer_address=${address}) or (id=${id} and owner_address=${address}) `;
        return result;
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
    getTicketsByAddress: async (address) => {

        const result = await sql`SELECT * FROM ticket WHERE issuer_address=${address}`
        return result

    },

    updateOneTicket: async (id, status, transaction_hash) => {
        transaction_hash = transaction_hash || null;
        try {
            await sql`UPDATE ticket SET status=${status} , transaction_hash=${transaction_hash} WHERE id=${id} and issuer_address=' '`;
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
    },
    deleteTicketExceptUser: async (id) => {
        try {
            await sql`DELETE FROM ticket WHERE id=${id} and issuer_address!=' '`;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    deleteOneTicketByAddress: async (address) => {
        try {
            const ticket = await sql`SELECT * FROM ticket WHERE issuer_address=${address}`
            if (ticket.length == 0) {
                return false
            }
            await sql`DELETE FROM ticket WHERE issuer_address=${address}`
            return true
        } catch (err) {
            console.error(err);
            return false;
        }

    },
    deleteTicketByOrg: async (org) => {
        try {
            const ticket = await sql`SELECT * FROM ticket WHERE licensing_authority=${org}`
            if (ticket.length == 0) {
                return false
            }
            await sql`DELETE FROM ticket WHERE licensing_authority=${org}`
            return true
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}