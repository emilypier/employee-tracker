//BACK END
const connection = require('./connection');

class DB {
  constructor(connection){
    this.connection = connection
  }

  findAllDepartments(){
    return this.connection.promise().query('SELECT * FROM department')
  }

  //find all role: job title, role id, the department that role belongs to, and the salary for that role
  findAllRoles(){
    return this.connection.promise().query ('SELECT role.title, role.id, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id;')
  }

  //find all employees: formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
  findAllEmployees(){
    return this.connection.promise().query ("SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ' , manager.last_name) AS manager FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.manager_id = employee.id;")
  }

  createNewDepartment(name){
    return this.connection.promise().query ('INSERT INTO department SET ?', name)
  }

  createNewRole(role){
    return this.connection.promise().query('INSERT INTO role SET ?', role)
  }

  // createUpdatedRole(){
  //   return this.connection.promise().query('')
  // }

  // createNewEmployee(role){
  //   return this.connection.promise().query('INSERT INTO role SET ?', role)
  // }

}

module.exports= new DB(connection)

