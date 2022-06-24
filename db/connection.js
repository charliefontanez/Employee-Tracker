const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee'
  },
  console.log('Conntected to the employee database')
);

module.exports = db;