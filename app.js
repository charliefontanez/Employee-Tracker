const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./db/connection');
var quit = false;

function viewAllDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, function(err, results) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('\n');
      return results;
    }
  });
}

async function promptUser() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'options',
      message: 'What would you like to do?',
      choices: [
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'View All Emloyees',
      'Add Department',
      'Quit',
      'test'
      ]
    }
  ]);
}
async function start(quit) {
  var choice = await promptUser();
  console.log(choice.options);
  if (choice.options == 'Quit') {
    quit = true;
  }
  
  while (quit == false) {
    let choice = await inquirer.prompt([
      {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
        'Add Employee',
        'Update Employee Role',
        'View All Roles',
        'Add Role',
        'View All Departments',
        'View All Emloyees',
        'Add Department',
        'Quit',
        'test'
        ]
      }
    ]);
    var show = {};
    switch(choice.options) {
      case 'Quit':
        quit = true;
        break;

      case 'Add Employee':
        // Add Employee to database
        break;

      case 'Update Employee Role':
        // Update Employee Role in database
        break;

      case 'View All Roles':
        // Query Database for all roles
        break;

      case 'Add Role':
        // Add role to database
        break;

      case 'View All Departments':
        // Show table with all departments
        db.execute('SELECT * FROM departments', function(err, results) {
          if (err) {
            console.log(err);
          }
          else {
            console.log('\n');
            console.table(results);
          }
        });
        break;

      case 'View All Employees':
        // Show table with all employees
        break;

      case 'Add Department':
        // Add department to database
        break;
      
      default:
        console.log('Unexpected option received.');
    }
  }
};

start(quit);