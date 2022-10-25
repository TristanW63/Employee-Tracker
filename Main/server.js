const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTables = require('console.table');
const logo = require('asciiart-logo')

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Newmoon63!',
      database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
  );

  db.connect(function(err) {
    if (err) throw err;
    console.log(
      logo({
        name:'Employee Tracker',
        lineChars: 10,
        padding: 2,
        margin: 3,
        borderColor: 'grey',
        logoColor: 'blue',
        textColor: 'blue',
      })
      .render()
    );
    console.log('Welcome to Employee Database')
    init();
  })

  function init() {
    inquirer.prompt ({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices : [
        "Add a role",
        "Add an employee",
        "Add a department",
        "View departments",
        "View roles",
        "View employees",
        "Update an employee's role",
        "Exit",
      ],
    }).then(function(answer){
      switch (answer.action) {
        case "Add a department":
          addDepartment();
          break;

          case "Add a role":
            addRole();
            break;

            case "Add an employee":
            addEmployee();
            break;

            case "View departments":
            viewDepartment();
            break;

            case "View roles":
            viewRole();
            break;

            case "View employees":
            viewEmployee();
            break;

            case "Update an employee's role":
            updateRole();
            break;

            case "Exit":
            db.end();
            console.log("Bye!")
            console.log(
              logo({
                name:'Employee Tracker',
                lineChars: 10,
                padding: 2,
                margin: 3,
                borderColor: 'grey',
                logoColor: 'blue',
                textColor: 'blue',
              })
              .render()
            );
            break;
      }
    })
    }
  
    function viewDepartment (){
      const sql = `SELECT * FROM department`;
      db.query (sql, (err,result) =>{
        if (err) throw err;
        console.table(result);
        init();
      });
    }

    function viewRole () {
      const sql = `SELECT role.id,title, department.name AS department,salary
        FROM role 
        LEFT JOIN department 
        ON role.department_id = department.id
        ORDER BY role.id;`;
      db.query (sql, (err,result) =>{
        if (err) throw err;
        console.table(result);
        init();
      });
      }

      function viewEmployee() {
        const sql = `SELECT employee.id,employee.first_name,employee.last_name,title,name AS department,salary,
          CONCAT(e.first_name," ",e.last_name) AS manager
          FROM employee
          LEFT JOIN role
          ON employee.role_id = role.id
          LEFT JOIN department
          ON role.department_id = department.id
          LEFT JOIN employee e
          ON employee.manager_id = e.id
          ORDER BY employee.id;`;
        db.query (sql, (err,result) =>{
          if (err) throw err;
          console.table(result);
          init();
        });
        }

        function addDepartment () {
          inquirer.prompt({
            name: 'name', 
            type: 'input', 
            message: 'Which department would you like to add?'
            }).then(function (answer) {
              // `ALTER TABLE department AUTO_INCREMENT = 1; INSERT INTO department SET ?`
            db.query(
                `INSERT INTO department SET ?`,
                answer);
                const sql = 'SELECT * FROM department';
                db.query(sql, function(err, res) {
                if(err)throw err;
                console.log(answer.name + ' has been added!');
                console.table('All Departments:', res);
                init();
              })
          })
        }

        function addRole () {
          db.query (
            `SELECT DISTINCT * FROM department`, (err,result) =>{
            if (err) throw err;
            inquirer.prompt([
            {
              name: "role",
              type: "input",
              message: "What is the title of the role you like to add?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary of the role? (must be a number and without separating with commas)",
              validate: input => {
                if  (isNaN(input)) {
                    console.log ("Please enter a number!")
                    return false; 
                } else {
                    return true;
                }
            }
            },
            {
              name: 'department',
              type: 'list',
              message: "What department does the role belong to?",
              choices: () =>
              result.map((result) => result.name),
          }])
          .then(function (answers) {
            const departmentID = result.filter((result) => result.name === answers.department)[0].id;
            db.query(
              "INSERT INTO role SET ?",
              {
                title: answers.role,
                salary: answers.salary,
                department_id: departmentID
              },
              function (err) {
                if (err) throw err;
                console.log(err)
                console.log(answers.role + " successfully add to roles under " + answers.department);
                init();
              }
            );
          });
        })
        };

        function addEmployee () {
          db.query (
            `SELECT DISTINCT title,id FROM role`, (err,role_result) =>{
            if (err) throw err;
            db.query (
              `SELECT DISTINCT CONCAT(e.first_name," ",e.last_name) AS manager_name,e.id
              FROM employee
              LEFT JOIN employee e
              ON employee.manager_id = e.id
              WHERE employee.manager_id IS NOT NULL`, (err,manager_result) =>{
              if (err) throw err;
                inquirer.prompt([
                {
                  name: "first_name",
                  type: "input",
                  message: "What is the employee's first name?",
                },
                {
                  name: "last_name",
                  type: "input",
                  message: "What is the employee's last name?",
                },
                {
                  name: "role",
                  type: "list",
                  message: "What is the employee's role?",
                  choices: () =>
                  role_result.map(({id,title}) => ({name: title, value: id}) ),
                },
                {
                  name: 'manager',
                  type: 'list',
                  message: "Who is the employee's manager?",
                  choices: () =>
                  manager_result.map(({ id, first_name, last_name}) => ({ name: first_name + ''+ last_name, value: id})),//make it an array
              }])
          .then(function (answers) {
            const managerID = manager_result.filter((manager_result) => manager_result.manager_name === answers.manager)[0].id;
            const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
            db.query(
              "INSERT INTO employee SET ?",
              { 
                first_name: answers.first_name,
                last_name: answers.last_name,
                role_id: roleID,
                manager_id: managerID
              },
              function (err) {
                if (err) throw err;
                console.log(answers.first_name + ' ' + answers.last_name + " is successfully added!");
                init();
              }
            );
          });
        })
        })
        };
        
        function updateRole () {
          db.query(`SELECT * FROM employee`, (err, employee_result) => {
            if (err) throw err;
            db.query(`SELECT * FROM role`, (err, role_result) => {
                  if (err) throw err;
                  inquirer.prompt([
                {
                  name: "employee",
                  type: "list",
                  message: "Which employee would you like to update?",
                  choices: () =>
                  employee_result.map(
                      (employee_result) => employee_result.first_name + " " + employee_result.last_name
                    ),
                },
                {
                  name: "role",
                  type: "list",
                  message: "Which role do you want to assign the selected employee?",
                  choices: () =>
                  role_result.map(
                      (role_result) => role_result.title
                    ),
                },
              ])
              .then((answers) => {
                const roleID = role_result.filter((role_result) => role_result.title === answers.role)[0].id;
                const empID = employee_result.filter((employee_result) => employee_result.first_name + " " + employee_result.last_name === answers.employee)[0].id;
                db.query(
                  `UPDATE employee SET ? WHERE ?`,
                  [{ 
                    role_id: roleID
                  },
                  {
                    id: empID
                  }],
                  function (err) {
                    if (err) throw err;
                    console.log(answers.employee + "'s role is successfully updated!");
                    init();
                  }
                );
               });
            })
          })
        }