const inquirer = require('inquirer');
const SQL = require('./helpers/sqlRequest.js');

var menuQuestion = [
    {
        // type, message, name, choices
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'quit']
    }
];

function displayMenu() {
    inquirer.prompt(menuQuestion).then((answers) => {
        console.log('This is the answer variable: ', answers);
        // switch - tests what we're answering
        switch (answers.menu) {
            case 'View all departments':
                SQL.displayDep().then(() => {
                    displayMenu();
                });
                break;
            case 'View all roles':
                SQL.displayRoles().then(() => {
                    displayMenu();
                });
                break;
            case 'View all employees':
                SQL.displayEmployees().then(() => {
                    displayMenu();
                });
        }
    });
};

// displaying table data with the functions here.

displayMenu();