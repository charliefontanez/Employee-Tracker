const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");
const db = require("./db/connection");
var quit = false;
var choice = '';
menu();

function viewAllDepartments() {
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

function viewAllRoles() {
  let sql = 
  `
  SELECT role.id, role.title, departments.name AS department, role.salary
  FROM role 
  LEFT JOIN departments 
  ON role.department_id = departments.id
  `

  // SELECT role.id, role.title, departments.name AS department, role.salary FROM role LEFT JOIN departments ON role.department_id = departments.id;

  db.query(sql, function (err, results) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
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

function viewAllEmployees() {
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

function addEmployee() {
  var employeeList = ['None'];
  var employeeQuery = [];
  let sql = 'SELECT * FROM employee';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      employeeQuery = result;
      for (let i = 0; i < result.length; i++) {
        employeeList.push(result[i].first_name + ' ' + result[i].last_name);
      }
    }
  });

  var roleList = [];
  var roleData = [];
  sql = 'SELECT title FROM role';
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    else {
      roleData = result;
      for (let i = 0; i < result.length; i++) {
        roleList.push(result[i].title);
      }
    }
  });
  
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
      choices: roleList
    },
    {
      type: 'list',
      name: 'manager',
      message: 'Who is your employees manager?',
      choices: employeeList,
    }

  ]).then(values => {
    console.log(values);
    if (values.manager == 'None') {
      values.manager = null;
    }
    else {
      var fullName = '';
      for (i = 0; i < employeeQuery.length; i++) {
        fullName = employeeQuery[i].first_name + ' ' + employeeQuery[i].last_name;
        if (values.manager == fullName) {
          values.manager_id = employeeQuery[i].id;
          break;
        }
      }
    }

    for (i = 0; i < roleData.length; i++) {
      if (values.role == roleData[i].title) {
        values.role_id = roleData[i].id;
        break;
      }
    }

    let params = [values.first_name, values.last_name, values.role_id, values.manager_id];
    db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)', params, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        menu();
      }
    })
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'department_name',
      message: 'What is the department name?'
    }
  ]).then(response => {
    let sql = `INSERT INTO departments (name) VALUE (?)`;

    db.query(sql, response.department_name, (err) => {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Department Added');
        menu();
      }
    });
  });
}

function addRole() {
  let departmentNames = [];
  let departments = [];
  db.query('SELECT * FROM departments', (err, results) => {
    if (err) {
      console.log(err);
    }
    else {
      departments = results;
      console.log(departments);
      for (let i = 0; i < results.length; i++) {
        departmentNames.push(results[i].name);
      }
    }
  });

  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the role?'
    },
    {
      type: 'number',
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
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].name == answers.department_name) {
        answers.department_id = departments[i].id;
        break;
      }
    }
    
    let params = [answers.title, answers.salary, answers.department_id]
    db.query('INSERT INTO role (title, salary, department_id) VALUES(?,?,?)', params, (err) => {
      if (err) throw err;
    });
    menu();
  })
}

async function menu() {
  choice = await promptOptions();

  console.log(choice);

  switch (choice.options) {
    case "Quit":
      console.log("goodbye\n");
      process.exit();
      break;

    case "Add Employee":
      // Add Employee to database
      addEmployee();
      break;

    case "Update Employee Role":
      // Update Employee Role in database
      updateEmployeeRole();
      break;

    case "View All Roles":
      viewAllRoles();
      break;

    case "Add Role":
      addRole();
      break;

    case "View All Departments":
      viewAllDepartments();
      break;

    case "View All Employees":
      viewAllEmployees();
      break;

    case "Add Department":
      // Add department to database
      addDepartment();
      break;

    default:
      console.log("Unexpected option received.");
      menu();
  }
}

