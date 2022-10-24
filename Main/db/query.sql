SELECT role.id,title, department.name AS department,salary
FROM role
LEFT JOIN department
ON role.department_id = department.id
ORDER BY role.id;

SELECT employee.id, employee.first_name, employee.last_name,title,name AS department, salary,
CONCAT(e.first_name," ",e.last_name) AS manager
FROM employee
LEFT JOIN role
ON employee.role_id = role.id
LEFT JOIN department
ON role.department_id = department.id
LEFT JOIN employee e
ON employee.manager_id = e.id
ORDER BY employee.role_id
;


ALTER TABLE department AUTO_INCREMENT = 1
INSERT INTO department SET name = user_input
SELECT * FROM department

SELECT DISTINCT * FROM department
ALTER TABLE role AUTO_INCREMENT = 1
INSERT INTO role SET 
        title = user_input_role
        salary = user_input_salary
        department_id = user_choose_departID


SELECT DISTINCT title, id FROM role
SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
FROM employee
LEFT JOIN employee e
ON employee.manager_id = e.id
WHERE employee.manager_id IS NOT NULL

INSERT INTO employee SET 
        first_name = user_input_first_name,
        last_name = user_input_last_name,
        role_id = roleID(user_choose_role_id),
        manager_id = managerID(user_choose_manager_id)