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
    getCourseById: async (id) => {
        const result = sql`SELECT * FROM course WHERE id=${id}`
        return result;
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
            SELECT * FROM question WHERE course=${id} ORDER BY id ASC
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
    updateExamAndQuestions: async (courseInfo, exam) => {

        try {
            await sql`
            UPDATE course SET slug=${courseInfo.slug},name=${courseInfo.name}, description=${courseInfo.description}, image=${courseInfo.image}, licensing_authority=${courseInfo.licensing_authority}
            WHERE id=${courseInfo.id}
              `
            const { course, questions } = exam;
            let count = 1;
            const currentQuestions = await sql`SELECT id FROM question WHERE course=${course}`;
            const currentQuestionCount = currentQuestions.length;

            for (let question of questions) {
                const { id, questionText, options, open, correctAnswer } = question;
                console.log(question)
                // Construct an array of option texts, ensuring there are always 4 options
                const optionValues = [
                    options[0] ? options[0].optionText : '', // option_a
                    options[1] ? options[1].optionText : '', // option_b
                    options[2] ? options[2].optionText : '', // option_c
                    options[3] ? options[3].optionText : ''  // option_d
                ];

                if (count <= currentQuestionCount) {
                    // Update existing question
                    await sql`
                    UPDATE question SET question_text=${questionText}, option_a=${optionValues[0]}, 
                    option_b=${optionValues[1]}, option_c=${optionValues[2]}, option_d=${optionValues[3]},
                    correct_option=${correctAnswer} WHERE course=${course} and id=${id}
                `;
                } else {
                    // Insert new question
                    await sql`
                    INSERT INTO question (id,course, question_text, option_a, option_b, option_c, option_d, correct_option)
                    VALUES (${count},${course}, ${questionText}, ${optionValues[0]}, ${optionValues[1]}, ${optionValues[2]}, ${optionValues[3]}, ${correctAnswer})
                `;
                }
                count++;

            }
            const updatedQuestionIds = questions.map(q => q.id);

            const currentQuestionIds = currentQuestions.map(q => q.id);


            // Find ids of questions to delete (present in current but not in updated)
            const questionsToDelete = currentQuestionIds.filter(id => !updatedQuestionIds.includes(id));
            // // Delete questions that are not present in the updated list
            if (questionsToDelete.length > 0) {
                // Convert questionsToDelete to an array of integers
                const questionsToDeleteInt = questionsToDelete.map(id => parseInt(id));
                await sql`DELETE FROM question WHERE course=${course} AND id = ANY(${sql.array(questionsToDeleteInt).value})`;
            }


            return true;
        } catch (err) {
            console.log(err)
            return false;
        }


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
    },
    deleteCourseById: async (course_id) => {
        try {
            await sql`delete from course where id = ${course_id};`;
            return true;
        }
        catch (err) {
            return false
        }
    }


}