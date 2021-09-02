//  Dependencies
const mysql = require('mysql2');
const prompt = require('inquirer');
const db = require ("./db/connection");
require('console.table')
const logo = require("asciiart-logo");

//  Init, kicks off logo and questions
init();

// Declares the logo function
function init() {
    const myLogo = logo({name: "Employee Manager"}).render();
    console.log(myLogo);
    loadPrompts()
}

    // inquirer
async function loadPrompts() {
    const { choice } = await prompt([
        {
            type:'list',
            name:'choice',
            message:'What would you like to do?',
            choices: [

        {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
        },
        {
            name: "View All Employees By Department",
            value: "VIEW_EMPLOYEES_BY_DEPARTMENT"
        },
        {
            name: "Add Employee",
            value: "ADD_EMPLOYEE"
        },
        {
            name: "Remove Employee",
            value: "REMOVE_EMPLOYEE"
        },
        {
            name: "Update Employee Role",
            value: "UPDATE_EMPLOYEE_ROLE"
        },
        {
            name: "Update Employees Manager",
            value:"UPDATE_EMPLOYEE_MANAGER"
        },
        {
            name: "View All Roles",
            value: "VIEW_ROLES"
        },
        {
            name: "Add Role",
            value:"ADD_ROLE"
        },
        {
            name: "Remove Role",
            value: "REMOVE_ROLE"
        },
        {
            name: "View All Departments",
            value: "VIEW_DEPARTMENTS"
        },
        {
            name: "Add a Department",
            value: "ADD_DEPARTMENT"
        },
        {
            name: "Remove a Department",
            value: "REMOVE_DEPARTMENT"
        },
        {
            name: "Quit",
            value: "QUIT"
        }
    ]
}
]);
    //  Switch Statement for user choice
    //CREATE FUNCTIONS FROM THIS!!
switch(choice) {
    //  View employees
    case "VIEW_EMPLOYEES":
        return viewEmployees();
    //  View employees by dept
    case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        return viewEmployeesByDepartment();
    //  View employees by mgr
    case "VIEW_EMPLOYEES_BY_MANAGER":
        return viewEmployeesByManager();
    //  Add an employee
    case "ADD_EMPLOYEE":
        return addEmployee();
    //  Remove an employee
    case "REMOVE_EMPLOYEE":
        return removeEmployee();
    //  Update an employees role
    case "UPDATE_EMPLOYEE_ROLE":
        return updateEmployeeRole();
    //  Update an employees manager
    case "UPDATE_EMPLOYEE_MANAGER":
        return updateEmployeeManager();
    //  View all departments
    case "VIEW_DEPARTMENTS":
        return viewDepartments();
    //  Add a new department
    case "ADD_DEPARTMENT":
        return addDepartment();
    //  Remove a department
    case "REMOVE_DEPARTMENT":
        return removeDepartment();
    //  View Roles
    case "VIEW_ROLES":
        return viewRoles();
    //  Add a role
    case "ADD_ROLE":
        return addRole();
    //  Remove a role
    case "REMOVE_ROLE":
        return removeRole();
    default:
        return quit();
};
};