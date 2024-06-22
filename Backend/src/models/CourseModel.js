const sql = require("../config/db")

module.exports = {
    getAllCourses: async () => {
        try {
            const courses = await sql`SELECT * FROM course C,organization O where C.licensing_authority=O.org`;
            return courses;
        }
        catch (err) {
            return err;
        }

    },
    getOneCourse: async (id) => {
        const result = sql`
        SELECT * FROM course C,organization O WHERE C.id=${id} and C.licensing_authority=O.org
        `
        return result;
    },
    insertCourses: async (courses) => {
        const maxIdResult = await sql`
            SELECT MAX(id) FROM course;
        `;
        const maxId = maxIdResult[0].max || 0;
    },
    getTop3Courses: async () => {
        const result = await sql`
            SELECT * FROM course LIMIT 3
        `
        return result;
    },
    getExamForCourse: async (id) => {
        const result = await sql`
            SELECT * FROM question WHERE course=${id}
        `
        return result;

    },
    enrollCourse: async (id, address) => {
        try {
            await sql`
            INSERT INTO exam (address, course) VALUES (${address}, ${id})`
            return true;

        } catch (err) {
            return false
        }

    }

}