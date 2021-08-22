const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

//Uses dotenv package to hide passwords
process.env.DB_NAME,
process.env.DB_USER,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
;

// Database sourced from https://www.mikedane.com/databases/sql/creating-company-database/
var con = mysql.createConnection({
  database: "employee",
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD
});

/* See below for notes on questions array
- Questions are generated in node with the inquirer package
- Console.table package presents answers in node in table format
- '\n' adds a break in the console to enhance appearance and functionality 
- con.querys are used to generate queries for the sql db
*/

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
            con.query("SELECT * FROM departments", function (err, result, fields) {
              if (err) throw err;
              console.table('\n', result);
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
          con.query("SELECT * FROM roles", function (err, result, fields) {
            if (err) throw err;
            console.table('\n', result);
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
          con.query("SELECT * FROM employees", function (err, result, fields) {
            if (err) throw err;
            console.table('\n', result);
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
              var sql = "INSERT INTO departments (dep_id, dep_name) VALUES (NOT NULL, " + "'" + `${answers.department}` + "')";
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
      message: "Enter role title:",
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
      message: "Enter role department id:",
      when: (answers) => {
          if (answers.salary) {
              return true;
            }
          }
        },
      {
        type: "confirm",
        name: "confirmAddRole",
        message: "Add role to the database?",
        when: (answers) => {
            if (answers.adddepartment) {
                return true,
                con.connect(function(err) {
                  if (err) throw err;
                  console.log("Connected!"); 
                  var sql = "INSERT INTO roles (roles_id, roles_title, roles_salary, roles_department_id) VALUES (NOT NULL, " + "'" + `${answers.addrole}` + "', " + `${answers.salary}` + ", " + "" + `${answers.adddepartment}` + ")";
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
      name: "roleid",
      message: "Enter employee role id:",
      when: (answers) => {
          if (answers.lastname) {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "managerid",
      message: "Enter employee manager id:",
      when: (answers) => {
          if (answers.roleid) {
              return true;
          }
      }
    },
    {
    type: "confirm",
    name: "confirmAddEmployee",
    message: "Add employee to the database?",
    when: (answers) => {
        if (answers.managerid) {
            return true,
            con.connect(function(err) {
              if (err) throw err;
              console.log("Connected!"); 
              var sql = "INSERT INTO employees (emp_id, emp_first_name, emp_last_name, emp_role_id, emp_manager_id) VALUES (NOT NULL, " + "'" + `${answers.addemployee}` + "', " + "'" + `${answers.lastname}` + "', " + `${answers.roleid}` + ", " + "" + `${answers.managerid}` + ")";
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
      name: "updateemp",
      message: "Enter employee id of employee whose role you would like to update:",
      when: (answers) => {
          if (answers.optionselect === "update an employee role") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "newempid",
      message: "Enter new role id:",
      when: (answers) => {
          if (answers.updateemp) {
              return true;
          }
      }
    },
    {
    type: "confirm",
    name: "confirmUpdate",
    message: "Confirming you would like to update employee role id?",
    when: (answers) => {
        if (answers.updateemp) {
          return true,
          con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!"); 
            var sql = "UPDATE employees SET emp_role_id=" + `${answers.newempid}` + " WHERE emp_role_id=" + `${answers.updateemp}`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record updated");
            });
          });
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