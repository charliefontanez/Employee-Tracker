const mysql = require('mysql2');

// Connection will be your own database connection

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
  },
  console.log('Conntected to the employee database')
);

module.exports = db;