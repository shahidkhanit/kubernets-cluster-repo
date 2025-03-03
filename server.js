const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: "mysql",
    user: "root",
    password: "password",
    database: "studentdb",
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL!");
    db.query("CREATE DATABASE IF NOT EXISTS studentdb");
    db.query(`CREATE TABLE IF NOT EXISTS students (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(50),
        email VARCHAR(50),
        course VARCHAR(50)
    )`);
});

// API endpoint
app.post("/register", (req, res) => {
    const { name, email, course } = req.body;
    db.query("INSERT INTO students (name, email, course) VALUES (?, ?, ?)", [name, email, course], (err) => {
        if (err) return res.status(500).json({ message: "Registration failed" });
        res.json({ message: "Registration successful!" });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
