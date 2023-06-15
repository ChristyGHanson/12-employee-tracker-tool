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
        db.query(`SELECT * FROM employee`, (error, data) => {
            if (error) {
                reject(error);
            } else {
                console.table(data);
                resolve();
            }
        })
    });
}

// Exporting to index.js
module.exports = { displayDep, displayRoles, displayEmployees };