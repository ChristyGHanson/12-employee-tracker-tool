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

// Display Menu Choices.
function displayMenu() {
    // First it prints the choices in a menu.
    inquirer.prompt(menuQuestion).then((answers) => {
        // console.log('This is the answer variable: ', answers);
        // Switch to the answers in the menu in menuQuestion. 
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
                addEmployee();
                break;
            case 'Add role':
                // in the same file
                displayRoleQuestions();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'quit':
                process.exit();
                break;

        }
    });
};

// User prompts for adding new employees
function addEmployee() {
    // local variables that will store arrays
    var roleList = [];
    var managerList = [];
    // Query from sqlRequest.js file.
    SQL.getRoleTitles().then((result) => {
        roleList = result;
        SQL.getEmployeeNames().then((result) => {
            managerList = result;
            // User responds to each question here.
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
                    // array stored in roleList variable
                    choices: roleList
                },
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    name: 'manager',
                    // array stored in managerList
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
    var deptList = [];
    SQL.getDepartmentNames().then((result) => {
        deptList = result;

        const newRoleQuestions = [
            {
                type: 'input',
                message: "What is the new role?",
                name: 'new_role',
            },
            {
                type: 'input',
                message: "What is the salary?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "What is the department?",
                name: 'dept_name',
                choices: deptList
            }

        ];
        inquirer.prompt(newRoleQuestions).then((data) => {
            // insert the names from the array
            SQL.addRole(data.new_role, data.salary, data.dept_name).then(() => {
                // Goes and displays the menu questions again. This goes at the end of everything.
                displayMenu();
            });
        });
    });
};

// Questions for adding a new department with user string input.
function addDepartment() {
    var deptQuestions = [];
    SQL.displayDep().then((result) => {
        deptQuestions = result;
        const displayDepartmentQuestions = [
            {
                type: 'input',
                message: "Enter the department you want to add: ",
                name: 'dept_name'
            }
        ];
        // asks the questions. pass in newEmployeeQuestions
        // callback function 'data' has the answers to the questions
        inquirer.prompt(displayDepartmentQuestions).then((data) => {
            // dept_name comes from the array above.
            SQL.addNewDepartment(data.dept_name).then(() => {
                // Goes and displays the menu questions again. This goes at the end of everything.
                displayMenu();
            });
        });
    });
};


//  please continue with this one 6/19/23 tuesday - Juan delgado
function updateEmployeeRole() {
    // 2 arrays here
    var displayAllEmployees = [];
    var displayAllRoles = [];
    // need query. need list of all roles
    // which employee to update? I need the list of all employees from the db.
    // Query for getEmployeeNames to store in displayAllEmployees
    SQL.getEmployeeNames().then((result) => {
        displayAllEmployees = result;
        // Query for getRoleTitles to store in displayAllRoles
        SQL.getRoleTitles().then((result) => {
            displayAllRoles = result;
            // object in the array is store in questions.
            const questions = [{
                type: 'list',
                message: 'Select an existing employee whose role you want to update: ',
                name: 'employeeName',
                choices: displayAllEmployees
            },
            {
                type: 'list',
                message: 'What is the new role for the employee? ',
                name: 'role',
                choices: displayAllRoles
            }
            ];
            inquirer.prompt(questions).then((data) => {
                // console.log(data);
                SQL.updateEmployee(data.role, data.employeeName).then(() => {
                    // display menu again after updating employee role.
                    displayMenu();
                })

            })
        });
    });
};

// displaying table data with the functions here.
displayMenu();