INSERT INTO department (name)
VALUES ('Sales'),
       ('Enginerring'),
       ('Finance'),
       ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 5),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Chaves', 3, 3),
       ('Kevin', 'Hart', 4, 5),
       ('Tim', 'Allen', 5, 2),
       ('Tom', 'Ryenolds', 6, 5),
       ('Jim', 'Halbert', 7, 7),
       ('Sarah', 'Lourd', 8, 7);
       
    