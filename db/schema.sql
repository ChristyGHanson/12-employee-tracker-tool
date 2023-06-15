-- create the db here
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- create the 3 tables here
USE employee_db;

CREATE TABLE department(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id),
    manager_id INT
    -- FOREIGN KEY(manager_id) REFERENCES employee(id)
);




