-- seeds.sql

INSERT INTO department (dept_name)
VALUES ("Executive Department"),
       ("Administration"),
       ("Research and Development"),
       ("Marketing and Sales"),
       ("Human Resources"),
       ("Customer Service"),
       ("Accounting and Finance");

INSERT INTO role (title, salary, department_id)
VALUES ('President/CEO', 150000.00, 1),
       ('Product Researcher', 70000.00, 2),
       ('Product Developer', 70000.00, 3),
       ('Marketing Manager', 80000, 4),
       ('Social Media Manager', 40000.00, 5),
       ('Sales Manager', 80000, 6),
       ('Recruiter', 45000.00, 7),
       ('Budget manager', 75000.00, 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Elinor', 'Dashwood', 1, 1),
('Fanny', 'Price', 2, 2),
('Catherine', 'Morland', 3, 3),
('Elizabeth', 'Bennett', 4, 4),
('Emma', 'Woodhouse', 5, 5),
('Anne', 'Eliot', 6, 6),
('Jane', 'Fairfax', 7, 7),
('Augusta', 'Sneyd', 8, 8);


       
