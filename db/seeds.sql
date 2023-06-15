-- seeds.sql

INSERT INTO department (dept_name)
VALUES ("Administration"),
       ("Recruiting"),
       ("Planning Committee");

INSERT INTO role (title, salary, department_id)
VALUES ('Executive',50000.00, 1),
       ('Recruiter', 60000.00, 2),
       ('Budget manager',70000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Christy', 'Hanson', 2, 2),
('Amy', 'Hanson', 1, null),
('Berne', 'Hanson', 3, 2),
('Jerry', 'Hanson', 3, 3);

       
