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
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is your employees first name?',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is your employees last name?'
    },
    {
      type: 'input',
      name: 'role',
      message: 'what is your employees role?'
    },
    
  ]).then(values => {
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
      break;

    case "Update Employee Role":
      // Update Employee Role in database
      break;

    case "View All Roles":
      // Query Database for all roles
      break;

    case "Add Role":
      // Add role to database
      break;

    case "View All Departments":
      // Show table with all departments
      allDepartments();
      break;

    case "View All Employees":
      // Show table with all employees
      allEmployees();
      break;

    case "Add Department":
      // Add department to database
      break;

    default:
      console.log("Unexpected option received.");
      menu();
  }
}

var choice;

menu();
