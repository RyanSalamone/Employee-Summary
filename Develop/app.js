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
                  "I see " +
                  data.name +
                  " is a manager. What is their office number?",
                name: "office"
              }
            ])
            .then(function(res) {
              const officeNum = res.office;
              const teamManager = new Manager(
                data.name,
                data.id,
                data.email,
                officeNum,
                "Manager"
              );
              team.push(teamManager);
            });
          break;
        case "Engineer":
          await inquirer
            .prompt([
              {
                type: "input",
                message:
                  "I see " +
                  data.name +
                  " is an engineer. What is their github username?",
                name: "github"
              }
            ])
            .then(function(res) {
              const githubName = res.github;
              const teamEngineer = new Engineer(
                data.name,
                data.id,
                data.email,
                githubName,
                "Engineer"
              );
              team.push(teamEngineer);
            });
          break;
        case "Intern":
          await inquirer
            .prompt([
              {
                type: "input",
                message:
                  "I see " +
                  data.name +
                  "is an intern. What is school does/did they attend?",
                name: "school"
              }
            ])
            .then(function(res) {
              const internSchool = res.school;
              const teamIntern = new Intern(
                data.name,
                data.id,
                data.email,
                internSchool,
                "Intern"
              );
              team.push(teamIntern);
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
          'Add another team member? Type "yes" to add employee, hit any enter to exit and generate roster.',
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
    console.log("Thank you. Your roster is being generated");
    console.log(team);
    const html = await generateHTML(team);
    writeFileAsync("./output/team.html", html);
}

function init(){
  console.log("Welcome to your Employee Roster. Please enter your employees name, ID, and role. Your options are Manager, Intern, and Engineer. Please spell the role correctly and with a capital letter, otherwise the employee will not be logged and the program will exit.")
  newEmployee();
}

init();