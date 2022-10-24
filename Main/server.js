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
      password: '',
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
            veiwDepartments();
            break;

            case "View roles":
            veiwRole();
            break;

            case "View employees":
            veiwEmployee();
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
  