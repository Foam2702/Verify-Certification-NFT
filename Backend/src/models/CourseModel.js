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
    insertCourse: async (course) => {
        const maxIdResult = await sql`
            SELECT MAX(id) FROM course;
        `;
        const maxId = maxIdResult[0].max || 0;
        const newId = maxId + 1;
        try {
            const result = await sql`
            INSERT INTO course (id,slug,name, description, image, licensing_authority) VALUES (${newId},${course.slug},${course.name}, ${course.description}, ${course.image}, ${course.licensing_authority})`
            return newId;
        } catch (err) {
            return err;
        }

    },
    getTop10Courses: async () => {
        try {
            const courses = await sql`SELECT * FROM course C,organization O where C.licensing_authority=O.org LIMIT 10`;
            return courses;
        }
        catch (err) {
            console.log(err)
            return err;
        }
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
            INSERT INTO exam (address, course,status) VALUES (${address}, ${id},'examining')`
            return true;

        } catch (err) {
            return false
        }

    },
    getCourseName: async (name) => {
        const result = await sql`
            SELECT * FROM course WHERE name=${name}
        `
        return result;
    },
    getCourseByOrg: async (org) => {
        const result = await sql`SELECT * FROM course where licensing_authority=${org}`
        return result
    },
    getCourseByOrgAndInfo: async (org) => {
        const result = await sql`SELECT * FROM course C,organization O where C.licensing_authority=O.org 
        and licensing_authority=${org}
        `
        return result
    },
    deleteOneCourseByOrg: async (org) => {
        try {
            await sql`delete from course where licensing_authority = ${org};`;
            return true;
        }
        catch (err) {
            return false
        }
    },
    deleteQuestionByCourseId: async (course_id) => {
        try {
            await sql`delete from question where course = ${course_id};`;
            return true;
        }
        catch (err) {
            return false
        }
    }


}