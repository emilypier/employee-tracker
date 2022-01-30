//FRONT END
const inquirer = require('inquirer');
const { findAllRoles } = require('./db');
const db = require('./db');
require('console.table');

function start(){
  loadQuestions()
}

function loadQuestions(){
  inquirer
  .prompt([
    {// update an employee role
      type: 'list',
      name: 'userResponse',
      message: 'What would you like to do?',
      choices: [
        'view all departments', 
        'view all roles',
        'view all employees', 
        'add a department', 
        'add a role', 
        'add an employee',
        // 'update an employee role', 
        'Quit'
      ]
    },
  ])
  .then((answers) => {
  const userResponse = answers.userResponse;

    switch (userResponse) {
      case 'view all departments':
        viewAllDepartments();
        break;
      case 'view all roles':
        viewAllRoles();
        break;
      case 'view all employees': 
        viewAllEmployees();
        break;
      case 'add a department':
        addDepartment();
        break;
      case 'add a role':
        addRole();
        break;
      case 'add an employee':
        addEmployee();
        break;
      case 'update an employee role':
        updateRole();
        break;
      default:
        process.exit();
    }
  })

}

//presented with a formatted table showing department names & department ids
function viewAllDepartments(){
  db.findAllDepartments().then(([depts])=>{
    console.table(depts)
  }).then(()=> loadQuestions())
};

//presented with formatted table showing job title, role id, department that role belongs to, & salary for that role
function viewAllRoles(){
  db.findAllRoles().then(([roles]) => {
    console.table(roles)
  }).then(()=> loadQuestions())
};

//presented with formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, & managers that the employees report to
function viewAllEmployees(){
  db.findAllEmployees().then(([employees]) => {
    console.table(employees)
  }).then(()=> loadQuestions())
};

//prompted to enter the name of the department & that department is added to database
function addDepartment(){
  db.findAllDepartments().then(() => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
      }
    ]).then((answers) => {
      db.createNewDepartment(answers)
      .then(() => loadQuestions());
    })
  })
};

//prompted to enter the name, salary, & department for the role & that role is added to database
function addRole(){
  db.findAllDepartments().then(([depts]) => {

    let departments = depts.map(({id, name}) => ({
      name: name,
      value: id
    }))

    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: "What is the name of the role?"
      }, 
      {
        type:'input',
        name: 'salary',
        message: "What is the salary for the role?"
      }, 
      {
        type: 'list',
        name: 'department_id',
        message: "What department does the role belong to?",
        choices: departments
      }
    ]).then((answers) => {
      db.createNewRole(answers)
      .then(() => loadQuestions());
    })
  })
};

//prompted to enter the employee’s first name, last name, role, & manager, & that employee is added to database
function addEmployee(){
  db.findAllRoles().then(([roles]) => {

    let roleChoices = roles.map(({id, title}) => ({
      name: title,
      value: id
    }))

    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?"
      }, 
      {
        type:'input',
        name: 'last_name',
        message: "What is the employee's last name?"
      }, 
      {
        type: 'list',
        name: 'role_id',
        message: "What is the employee's role?",
        choices: roleChoices
      },
    ]).then((answers)=>{
      db.createNewEmployee(answers)
      .then(()=> loadQuestions());
    })
  })
};

// //prompted to select an employee to update and their new role and this info is updated in database
// function updateRole(){
//   db.findAllEmployees().then(([employees]) => {

//     let employeeChoices = employees.map(({id, first_name, last_name}) => ({
//       name: `${first_name} ${last_name}`,
//       value: id
//     }))

//     inquirer.prompt([ 
//       {
//         type: 'list',
//         name: 'employee',
//         message: "Which employee is changing roles?",
//         choices: employeeChoices
//       },
//       {
//         type: 'input',
//         name: 'role',
//         message: "What is the employee's new role?",
//       }, 

//     ]).then((answers)=>{
//       db.createUpdatedRole(answers)
//       .then(()=> loadQuestions());
//     })
//   })
// };



  start();