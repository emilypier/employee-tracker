const mysql = require('mysql2');

//connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Popcorn61!',
  database: 'employees_db'
});

module.exports = db;