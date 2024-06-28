// app.js
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
    onnotice: console.log,
    retry: {
        max: 10, // Maximum number of retries
        delay: 5000, // Delay between retries in milliseconds
        onRetry: (attempt) => console.log(`Retry attempt: ${attempt}`),
    },
});
module.exports = sql;
