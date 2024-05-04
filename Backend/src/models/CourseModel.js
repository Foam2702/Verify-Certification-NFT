const sql = require("../config/db")

module.exports = {
    getAllCourses: async () => {
        try {
            const courses = await sql`SELECT * FROM course`;
            return courses;
        }
        catch (err) {
            return err;
        }

    },
    getOneCourse: async (slug) => {
        const result = sql`
            SELECT * FROM course WHERE slug=${slug}
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
    }

}