const express = require('express');
const app = express();
const PORT = 3000;
const employees = require("./database");

app.get("/", (req, res) => res.json("Hello employees!"));

app.get("/employees", (req, res) => res.json(employees));



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});