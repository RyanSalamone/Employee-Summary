const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, github, title) {
    super( name, id, email,"Engineer");
    this.github = github;
    this.title = title;

  }
  getGithub(github) {
      
      return this.github;
  }

  getRole(title){
      return "Engineer";
  }
};

module.exports = Engineer;