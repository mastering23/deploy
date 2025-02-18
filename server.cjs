const express = require('express');
const app = express();
const PORT = 3000;
const users = require("./database.cjs");

app.use(express.static('dist'));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/employees", (req, res) => res.json(users));

app.get("/employees/random", (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(users[randomIndex]);
});

app.get("/employees/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((user) => user.id === userId);
  
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "Employee not found" });
    }
});


const getNextId = () => {
    const ids = users.map(user => user.id).sort((a, b) => a - b);
    const nextId = ids.reduce((expectedId, currentId) => {
        if (currentId === expectedId) {
            return expectedId + 1; 
        }
        return expectedId; 
    }, 1);

    return nextId;
};



app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    newEmployee.id = getNextId();


    if (!newEmployee.name || !newEmployee.email) {
        return res.status(400).json({ message: "Employee data is incomplete" });
    }
    users.push(newEmployee);
    res.status(201).json(newEmployee);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
