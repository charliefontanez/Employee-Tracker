const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("./db/connection");
var quit = false;

function allDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    if (err) {
      console.log(err);
    } else {
      console.log("\n");
      console.table(results);
      menu();
    }
  });
}

function promptOptions() {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "View All Employees",
        "Add Department",
        "Quit"
      ],
    },
  ]);
}

function addEmployee() {
  var employeeList = ['None'];
  let sql = 'SELECT first_name, last_name FROM employee';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        employeeList.push(result[i].name);
      }
    }
  })

  var roleList = [];
  sql = 'SELECT title FROM role';
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

function addRole() {
  var departmentNames = [];
  db.query('SELECT name FROM departments', (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      for (let i = 0; i < results.length; i++) {
        departmentNames.push(results[i].name);
      }
    }
  })
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary of the role?'
    },
    {
      type: 'list',
      name: 'department_name',
      message: 'What department does this role belong to?',
      choices: departmentNames
    }
  ]).then(answers => {
    console.log(answers.departmentName);
    let params = [answers.title, answers.salary,]
    db.query('INSERT INTO role (title, salary, department_id) VALUES(?,?,?)' )

    menu();
  })
}

function allEmployees() {
  
  db.query('SELECT * FROM employee', function(err, result) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      console.table(result);
      menu();
    }
  })
}

async function menu() {
  choice = await promptOptions();

  console.log(choice);

  switch (choice.options) {
    case "Quit":
      console.log("quit selected\n");
      process.exit();
      break;

    case "Add Employee":
      // Add Employee to database
      addEmployee();
      break;

    case "Update Employee Role":
      // Update Employee Role in database
      break;

    case "View All Roles":
      // Query Database for all roles
      break;

    case "Add Role":
      // Add role to database
      addRole();
      break;

    case "View All Departments":
      // Show table with all departments
      allDepartments();
      break;

    case "View All Employees":
      // Show table with all employees
      allEmployees();
      // All Employee function finished
      break;

    case "Add Department":
      // Add department to database
      break;

    default:
      console.log("Unexpected option received.");
      menu();
  }
}

var choice = '';

menu();


// var array = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// var newArray = [];

// for (let i = 0; i < array.length; i++) {
//   newArray.push(array[i]);
// }

// console.log(newArray);