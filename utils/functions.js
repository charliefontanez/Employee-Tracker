const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("./db/connection");

function addEmployee() {
  var employeeList = ['None'];
  let sql = 'SELECT first_name, last_name FROM employee';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      for (let i = 0; i < results.length; i++) {
        employeeList.push(results[i].name);
      }
    }
  })

  var roleList = [];
  sql = 'SELECT * FROM role';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      for (let i = 0; i < result.length; i++) {
        roleList.push(result[i].title);
      }
    }
  })
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is your employees first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is your employees last name?',
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is your employees role?',
      choices: roleList,
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is your employees manager?',
      choices: employeeList,
    }

  ]).then(values => {
    if (values.manager == 'None') {
      values.manager = null;
    }


    let params = [values.first_name, values.last_name];
    db.query('INSERT INTO employee (first_name, last_name) VALUES(?,?)', params, (err, result) => {
      if (err) throw err;
      else {
        console.table(results);
        menu();
      }
    })
  })

}

addEmployee();