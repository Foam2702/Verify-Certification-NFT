const express = require('express');
const app = express();
const PORT = 8080;
app.listen(() => {
    console.log(`Running at http://localhost:${PORT}`);
})