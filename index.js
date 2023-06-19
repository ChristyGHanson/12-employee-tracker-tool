const inquirer = require('inquirer');
const SQL = require('./helpers/sqlRequest.js');

const menuQuestion = [
    {
        // type, message, name, choices
        type: 'list',
        message: 'What would you like to do?',
        name: 'menu',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'quit']
    }
];

// TO DO - CASES: add case for "dept," add case for "update employee role"
// Display Menu Choices.
function displayMenu() {
    inquirer.prompt(menuQuestion).then((answers) => {
        console.log('This is the answer variable: ', answers);
        // Switch tests what we're answering. gets answer from the array stored in menuQuestion.
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
                break;
            case 'Add employee':
                // in the same file
                displayEmpQuestions();
                break;
            case 'Add role':
                // in the same file
                displayRoleQuestions();
                break;
            case 'Add department':
                displayDeptQuestions();
                break;
            case 'Update employee role':
                updateEmpRole();
                break;
            case 'quit':
                break;

        }
    });
};

// Display Employee Questions
function displayEmpQuestions() {
    var roleList = [];
    var managerList = [];
    SQL.getRoleTitles().then((result) => {
        roleList = result;
        SQL.getEmployeeNames().then((result) => {
            managerList = result;
            const newEmployeeQuestions = [
                {
                    type: 'input',
                    message: "What is the employee's first name?",
                    name: 'first_name',
                },
                {
                    type: 'input',
                    message: "What is the employee's last name?",
                    name: 'last_name',
                },
                {
                    type: 'list',
                    message: "What is the employee's role?",
                    name: 'role',
                    choices: roleList
                },
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    name: 'manager',
                    choices: managerList
                }
            ];
            // asks the questions. pass in newEmployeeQuestions
            // callback function 'data' has the answers to the questions
            inquirer.prompt(newEmployeeQuestions).then((data) => {
                SQL.addEmployee(data.first_name, data.last_name, data.role, data.manager).then(() => {
                    // Goes and displays the menu questions again. This goes at the end of everything.
                    displayMenu();
                })
            })
        });
    });
};

// Display role questions
function displayRoleQuestions() {
    // need 1 list
    var deptList = [];
    SQL.getDepartmentNames().then((result) => {
        deptList = result;

        const newRoleQuestions = [
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'first_name',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last_name',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleList
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                name: 'manager',
                choices: managerList
            }
        ];
        // asks the questions. pass in newEmployeeQuestions
        // callback function 'data' has the answers to the questions
        inquirer.prompt(newRoleQuestions).then((data) => {
            SQL.addEmployee(data.first_name, data.last_name, data.role, data.manager).then(() => {
                // Goes and displays the menu questions again. This goes at the end of everything.
                displayMenu();
            })
        })
    });
};

// Display department questions
function displayDeptQuestions() {
    var deptQuestions = [];
    SQL.displayDep().then((result) => {
        deptQuestions = result;
        const displayDepartmentQuestions = [
            {
                type: 'input',
                message: "Enter the department you want to add: ",
                name: 'dept_name',
            }
        ];
        // asks the questions. pass in newEmployeeQuestions
        // callback function 'data' has the answers to the questions
        inquirer.prompt(displayDepartmentQuestions).then((data) => {
            SQL.addEmployee(data.first_name, data.last_name, data.role, data.manager).then(() => {
                // Goes and displays the menu questions again. This goes at the end of everything.
                displayMenu();
            })
        });
    });
};


//  please continue with this one 6/19/23 tuesday - Juan delgado
function updateEmpRole() {
    var displayAllEmployees = [];
    var displayAllRoles = [];
    // need query. need list of all roles
    // which employee to update--needs list of all employees.
    SQL.getEmployeeNames().then((result) => {
        displayAllEmployees = result;
        SQL.getRoleTitles().then((result) => {
            displayAllRoles = result;
            const questions = [{
                type: 'list',
                message: 'Select an employee whose role you want to update: ',
                name: 'employeeList',
                choices: displayAllEmployees,
            },
            {
                type: 'list',
                message: 'What is the new role for the employee? ',
                name: 'roleList',
                choices: displayAllRoles,
            }
            ];
            inquirer.prompt(questions).then((data) => {
                console.log(data);
                UPDATE data.employeeList;
                SETasdf;
                WEB asdf;

            })
        });
    });
};

// displaying table data with the functions here.
displayMenu();