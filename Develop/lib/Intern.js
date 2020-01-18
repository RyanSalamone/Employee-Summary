const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, email, school, title) {
    super( name, id, email,"Engineer");
    this.school = school;
    this.title = title;

  }
  getSchool(school) {
      
      return this.school;
  }

  getRole(title){
      return "Intern";
  }
};

module.exports = Intern;