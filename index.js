// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

//generates question array in inquirer package 
inquirer
  .prompt([
    { 
      type: 'input',
      name: 'name',
      message: 'What is your name?',
    },
    {
      type: 'list',
      name: 'occupation',
      message: 'What is your occupation?',
      choices: ["Manager", "Intern", "Engineer"],
    },
    {
      type: "input",
      name: "github",
      message: "Enter your github username:",
      when: (answers) => {
          if (answers.occupation === "Engineer") {
              return true;
          }
      }
    }, 
    {
      type: "input",
      name: "school",
      message: "Enter your school name:",
      when: (answers) => {
          if (answers.occupation === "Intern") {
              return true;
          }
      }
    },
    {
      type: "input",
      name: "office_number",
      message: "Enter your office number:",
      when: (answers) => {
          if (answers.occupation === "Manager") {
              return true;
          }
      }
    },    
    {
      type: "input",
      name: 'id',
      message: 'What is your ID?',
    },
    {
      type: "input",
      name: 'email',
      message: 'What is your email address?',
    },       
  ])
  
  .then((answers) => {
    console.log(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });