const express = require('express');
const app = express();
const PORT = 3000;
const employees = require("./database.cjs");

app.use(express.static('dist'))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/employees", (req, res) => res.json(employees));

app.get("/employees/random", (req, res) => {

    const randomIndex = Math.floor(Math.random() * employees.length);
    res.setHeader("Access-Control-Allow-Origin", "*");
    
    res.json(employees[randomIndex]);
  
  });
  

app.get("/employees/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = employees.find((user) => user.id === userId);
  
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  });
  
  app.post('/api/v2',(req,res)=>{
    console.log("POST is working");
  });


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});