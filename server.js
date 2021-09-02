//  Dependencies
const mysql = require('mysql2');
const prompt = require('inquirer');
const db = require ("./db");
require('console.table')

//  Initial prompt
init();

function init() {
    const myLogo = logo({name: "Employee Manager"}).render();
    console.log(myLogo);
    loadPrompts()
}
    // inquirer
        //  View All Departments
        //  View All Roles
        //  View All Employees
        //  Add A Department
        //  Add a Role
        //  Add an employee
        //  Update an Employee

    //  View All Departments
        //  show table of department names and ids

    //  View All Roles
        //  Presented w job title, role id, department the role is 