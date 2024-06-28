const sql = require("../config/db");

module.exports = {
    insertQuestions: async (data) => {
        try {
            const { course, questions } = data;
            let count = 1;

            for (let question of questions) {
                const { questionText, options, open, correctAnswer } = question;

                // Construct an array of option texts, ensuring there are always 4 options
                const optionValues = [
                    options[0] ? options[0].optionText : '', // option_a
                    options[1] ? options[1].optionText : '', // option_b
                    options[2] ? options[2].optionText : '', // option_c
                    options[3] ? options[3].optionText : ''  // option_d
                ];

                await sql`
                    INSERT INTO public.question (id, question_text, option_a, option_b, option_c, option_d, correct_option, course)
                    VALUES (${count},
                            ${questionText},
                            ${optionValues[0]},
                            ${optionValues[1]},
                            ${optionValues[2]},
                            ${optionValues[3]},
                            ${correctAnswer},
                            ${course})
                `;

                count++;
            }
            return true;
        } catch (error) {
            return error
        }
    }
};
