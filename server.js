//Dependencies found here
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Morpheus718",
  database: "employee_info_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  
    startScreen();
    //  connection.end();//
  });

  //What the user will first see once logged into node
function startScreen() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }

  //All of the corresponding functions found below

function addDepartment() {


    inquirer.prompt({
      
        type: "input",
        message: "What is the name of the department?",
        name: "deptName"

    }).then(function(answer){



        connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
            if (err) throw err;
            console.table(res)
            startScreen()
    })
    })
}

function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the name of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salaryTotal"
        },
        {
          type: "input",
          message: "What is the department id number?",
          name: "deptID"
        }
      ])
      .then(function(answer) {
  
  
        connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }