const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');



function promptUser() {
  
}

// promptUser().then(choice => {
//  console.log('successful');
// })

inquirer.prompt([
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
    'Quit']
  }
]);