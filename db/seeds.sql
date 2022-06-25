INSERT INTO departments (name)
VALUES
('Legal'),
('Finance'),
('Engineering'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 110000, 3),
('Lead Engineer', 150000, 3),
('Lawyer', 190000, 1),
('Account Manager', 160000, 2),
('Salesperson', 80000, 4),
('Sales Lead', 100000, 4),
('Accountant', 125000, 2),
('Legal Team Lead', 250000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Doe', 6, null),
('Mike', 'Chan', 5, 1),
('Ashley', 'Rodriguez', 2, null),
('Kevin', 'Tupik', 1, 3),
('Kunal', 'Singh', 4, null),
('Malia', 'Brown', 7, 5);
