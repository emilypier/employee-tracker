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
        'update an employee role', 
        'Quit'
      ]
    },
  ])
  .then((answers) => {
  const userResponse = answers.userResponse;

    switch (userResponse) {
      case 'view all departments':
        //presented with a formatted table showing department names & department ids
        viewAllDepartments();
        break;
      case 'view all roles':
        //presented with the job title, role id, the department that role belongs to, & the salary for that role
        viewAllRoles();
        break;
      case 'view all employees': 
        //presented with formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, & managers that the employees report to
        viewAllEmployees();
        break;
      case 'add a department':
        //prompted to enter the name of the department & that department is added to database
        addDepartment();
        break;
      case 'add a role':
        //prompted to enter the name, salary, & department for the role & that role is added to database
        addRole();
        break;
      case 'add an employee':
        //prompted to enter the employee’s first name, last name, role, & manager, & that employee is added to database
        break;
      case 'update an employee role':
        //prompted to select an employee to update and their new role and this info is updated in database
        updateRole();
        break;
        default:
          process.exit();
    }
  })

}

function viewAllDepartments(){
  db.findAllDepartments().then(([depts])=>{
    console.table(depts)
  }).then(()=> loadQuestions())
};

function viewAllRoles(){
  db.findAllRoles().then(([roles]) => {
    console.table(roles)
  }).then(()=> loadQuestions())
};

function viewAllEmployees(){
  db.findAllEmployees().then(([employees]) => {
    console.table(employees)
  }).then(()=> loadQuestions())
};

function addDepartment(){
  db.findAllDepartments().then(([depts])=>{
    
    let dept = depts.map(({id, name})=>({
      name: name,
      value: id
    }))
  
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?'
    }
  ]).then((answers)=>{
    db.createNewDepartment(answers)
    .then(()=> loadQuestions());
  })
})
};


function addRole(){
  db.findAllDepartments().then(([depts])=>{

    let departments = depts.map(({id, name})=>({
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
    ]).then((answers)=>{
      db.createNewRole(answers)
      .then(()=> loadQuestions());
    })
  })
};

function updateRole(){

};

  start();