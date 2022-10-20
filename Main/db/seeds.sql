INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Enginerring'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
       ('Salesperson', 80000, 1),
       ('Lead Engineer', 150000, 2),
       ('Software Engineer', 120000, 2),
       ('Account Manager', 160000, 3),
       ('Accountant', 125000, 3),
       ('Legal Team Lead', 250000, 4),
       ('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, 15),
       ('Mike', 'Chan', 2, 11),
       ('Ashley', 'Chaves', 3, 13),
       ('Kevin', 'Hart', 4, 11),
       ('Tim', 'Allen', 5, 2),
       ('Tom', 'Ryenolds', 6, 13),
       ('Jim', 'Halbert', 7, 15),
       ('Sarah', 'Lourd', 8, 14);
    