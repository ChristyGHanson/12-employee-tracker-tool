-- seeds.sql

INSERT INTO department (dept_name)
VALUES ("Administration"),
       ("Recruiting"),
       ("Planning Committee");

INSERT INTO role (salary, department_id)
VALUES (50000.00, 1),
       (60000.00, 2),
       (70000.00, 3),
       (80000.00, 4);

INSERT INTO employee (first_name, last_name)
VALUES (Christy, Hanson),
(Amy, Hanson),
(Berne, Hanson),
(Jerry, Hanson);
       
