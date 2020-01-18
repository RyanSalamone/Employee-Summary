const Employee = require("./lib/Employee");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const generateHTML = require("./output/generateHTML");
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const team = [];

const newEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "ID:",
        name: "id"
      },
      {
        type: "input",
        message: "Name:",
        name: "name"
      },
      {
        type: "input",
        message: "Role:",
        name: "role"
      },
      {
        type: "input",
        message: "Email:",
        name: "email"
      }
    ])
    .then(async function(data) {
      switch (data.role) {
        case "Manager":
          await inquirer
            .prompt([
              {
                type: "input",
                message:
                  "What is the manager, " +
                  data.name +
                  "'s, office number?",
                name: "office"
              }
            ])
            .then(function(res) {
              const employeeOffice = res.office;
              const employeeManager = new Manager(
                data.name,
                data.id,
                data.email,
                employeeOffice,
                "Manager"
              );
              team.push(employeeManager);
            });
          break;
        case "Engineer":
          await inquirer
            .prompt([
              {
                type: "input",
                message:
                  "What is the Engineer, " +
                  data.name +
                  "'s, github username?",
                name: "github"
              }
            ])
            .then(function(res) {
              const gitUser = res.github;
              const employeeEngineer = new Engineer(
                data.name,
                data.id,
                data.email,
                gitUser,
                "Engineer"
              );
              team.push(employeeEngineer);
            });
          break;
        case "Intern":
          await inquirer
            .prompt([
              {
                type: "input",
                message:
                  "What college does/did the Intern, " +
                  data.name +
                  ", attend?",
                name: "school"
              }
            ])
            .then(function(res) {
              const collegeInput = res.school;
              const employeeIntern = new Intern(
                data.name,
                data.id,
                data.email,
                collegeInput,
                "Intern"
              );
              team.push(employeeIntern);
            });
          break;
      }
    })
    .then(function() {
      addNext();
    });
};

const addNext = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message:
          'Type "yes" to add another employee, or press "Enter" to generate your roster!',
        name: "add"
      }
    ])
    .then(function(res) {
      if (res.add === "yes") {
        newEmployee();
      } else {
        console.log("Done");
        completedRoster(team);
      }
    });
};

async function completedRoster(team){
    console.log("One roster - comin' up!");
    console.log(team);
    const html = await generateHTML(team);
    writeFileAsync("./output/team.html", html);
}

function init(){
  console.log("Create Your Employee Roster Here - Start by entering the employee ID and continue adding from there, and make sure to use capital letters")
  newEmployee();
}

init();