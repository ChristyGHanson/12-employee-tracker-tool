// JS file will attach to SQL db.
// send SQL commands to it. 
// DISPLAY EMPLOYEES, ETC. 
// Pulls data from the seeds.sql file.

const SQL = require('mysql2');
const seeTable = require('console.table');

const db = SQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MdN_js1!',
    database: 'employee_db'
});

function displayDep() {
    return new Promise((resolve, reject) => {
        // query using SQL
        db.query(`SELECT * FROM department;`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                console.table(data);
                resolve();
            }
        })
    });
}

function displayRoles() {
    return new Promise((resolve, reject) => {
        // query using SQL
        // Specificity
        db.query(`SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.dept_name AS Department FROM role LEFT JOIN department ON role.department_id=department.id;`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                console.table(data);
                resolve();
            }
        })
    });
}

function displayEmployees() {
    return new Promise((resolve, reject) => {
        // query using SQL
        // Specificity
        db.query(`SELECT employee.id AS ID, CONCAT (employee.first_name,' ',employee.last_name) AS Name, role.title AS Role, role.salary AS Salary, CONCAT(manager.first_name,' ',manager.last_name) AS Manager FROM employee JOIN role ON employee.role_id=role.id JOIN department ON role.department_id=department.id LEFT JOIN employee manager ON manager.id=employee.manager_id`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                console.table(data);
                resolve();
            }
        })
    });
}

// get db information as array
function getEmployeeNames() {
    return new Promise((resolve, reject) => {
        // SQL - ARRAYAGG turns it into array
        // rowsAsArray is a property set to true
        db.query({ sql: `SELECT JSON_ARRAYAGG(CONCAT(first_name, ' ', last_name)) FROM employee;`, rowsAsArray: true }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                var names = [];
                result[0][0].forEach(element => {
                    names.push(element)
                });
                resolve(names);
            }
        })
    })
};

function getRoleTitles() {
    return new Promise((resolve, reject) => {
        // SQL - ARRAYAGG turns it into array
        // rowsAsArray is a property set to true
        db.query({ sql: `SELECT JSON_ARRAYAGG(title) FROM role;`, rowsAsArray: true }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                var titles = [];
                result[0][0].forEach(element => {
                    titles.push(element)
                });
                resolve(titles);
            }
        })
    })
};

function getDepartmentNames() {
    // Promise corresponds to .thens in index.js
    return new Promise((resolve, reject) => {
        // SQL - ARRAYAGG turns it into array
        db.query({ sql: `SELECT JSON_ARRAYAGG(dept_name) FROM department;`, rowsAsArray: true }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                var deptNames = [];
                result[0][0].forEach(element => {
                    deptNames.push(element)
                });
                resolve(deptNames);
            }
        })
    })
};

//  Create new function for addEmployee, which will come from the index.js file inside displayEmpQuestions
function addEmployee(first_name, last_name, title, manager_name) {
    return new Promise((resolve, reject) => {
        // SQL - ARRAYAGG turns it into array
        // convert the title to an ID.
        db.query(`SELECT id FROM role WHERE title='${title}';`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                // insert into role id in the db
                var role_id = result[0].id;
                db.query(`SELECT id FROM employee WHERE CONCAT(employee.first_name,' ',employee.last_name)='${manager_name}';`, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        // insert into role id in the db
                        var manager_id = result[0].id;
                        db.query(`INSERT INTO employee(first_name,last_name,role_id, manager_id) VALUE("${first_name}","${last_name}", ${role_id}, ${manager_id})`, (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                console.log(`Added ${first_name} ${last_name} to employee db`);
                                resolve();

                            }
                        })
                    }
                })

            }
        })
    })
};

// add ROLE, convert dept name to and id 
function addRole(title, salary, department_name) {
    return new Promise((resolve, reject) => {
        // SQL - ARRAYAGG turns it into array
        // convert the title to an ID.
        db.query(`SELECT id FROM department WHERE dept_name='${department_name}';`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                // insert into role id in the db
                var dept_id = result[0].id;
                db.query(`INSERT INTO role (title, salary, department_id) VALUE("${title}","${salary}", ${dept_id})`, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        console.log(`Added ${title} to role db`);
                        resolve();

                    }
                })

            }
        })
    })
};
// Exporting to index.js
module.exports = { displayDep, displayRoles, displayEmployees, getEmployeeNames, getRoleTitles, getDepartmentNames, addEmployee, addRole };