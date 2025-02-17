const express = require('express');
const app = express();
const PORT = 3000;
const employees = require("./database.cjs");

app.use(express.static('dist'))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/employees", (req, res) => res.json(employees));



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});