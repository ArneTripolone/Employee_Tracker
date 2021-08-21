// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

process.env.DB_NAME,
process.env.DB_USER,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
;

// Database from https://www.mikedane.com/databases/sql/creating-company-database/
var con = mysql.createConnection({
  database: "employee",
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD
});

//generates question array in inquirer package 
inquirer
  .prompt([
    { 
      type: 'list',
      name: 'optionselect',
      message: 'What would you like to do?',
      choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"],
  },
  { 
    type: 'confirm',
    name: 'viewDepartments',
    message: 'View all departments?',
    when: (answers) => {
      if (answers.optionselect === "view all departments") {
          return true,
          con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT * FROM employee", function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
          });
      }
  }
},
{ 
  type: 'confirm',
  name: 'viewRoles',
  message: 'View all roles?',
  when: (answers) => {
    if (answers.optionselect === "view all roles") {
        return true,
        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          });
        });
    }
}
},
{ 
  type: 'confirm',
  name: 'viewEmployees',
  message: 'View all employees?',
  when: (answers) => {
    if (answers.optionselect === "view all employees") {
        return true,
        con.connect(function(err) {
          if (err) throw err;
          con.query("SELECT * FROM employee", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
          });
        });
    }
}
},
    {
      type: "input",
      name: "department",
      message: "Enter the department name",
      when: (answers) => {
          if (answers.optionselect === "add a department") {
            return true;
          }
      }
    },
    {
      type: "confirm",
      name: "confirmDepartment",
      message: "Enter into database?",
      when: (answers) => {
          if (answers.department) {
            return true,
            con.connect(function(err) {
              if (err) throw err;
              console.log("Connected!");
              var sql = "INSERT INTO employee (name, address) VALUES ('Company Inc', 'Highway 37')";
              con.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
              });
            });
          }
      }
    },      
    {
      type: "input",
      name: "addrole",
      message: "Enter role name:",
      when: (answers) => {
          if (answers.optionselect === "add a role") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "salary",
      message: "Enter role salary:",
      when: (answers) => {
          if (answers.addrole) {
              return true;
          }
      }
    },    
    {
      type: "input",
      name: "adddepartment",
      message: "Enter role department:",
      when: (answers) => {
          if (answers.salary) {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "addemployee",
      message: "Enter employee first name:",
      when: (answers) => {
          if (answers.optionselect === "add an employee") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "lastname",
      message: "Enter employee last name:",
      when: (answers) => {
          if (answers.addemployee) {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "role",
      message: "Enter employee role:",
      when: (answers) => {
          if (answers.lastname) {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "manager",
      message: "Enter employee manager:",
      when: (answers) => {
          if (answers.role) {
              return true;
          }
      }
    },
    {
      type: "list",
      name: "updateemployee",
      message: "Select employee to update",
      choices: ["not sure how to do this one exactly"],
      when: (answers) => {
          if (answers.optionselect === "update an employee role") {
              return true;
          }
      }
    },                      
  ])
  .then((answers) => {
    console.log(answers.optionselect)
  })

.catch((error) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    // Something else went wrong
  }
})