const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, email, office, title) {
    super( name, id, email,"Engineer");
    this.office = office;
    this.title = title;

  }
  getOffice(office) {
      
      return this.office;
  }

  getRole(title){
      return "Manager";
  }
};

module.exports = Manager;