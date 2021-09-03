const connection = require('./connection');
const mysql = require('mysql2');

function dbmake(connection) {
    let database = Object.assign({}, functions);
    database.connect = connection;
    return database;
}

//  Will create functions here!
const functions = {
    //  FIND ALL EMPLOYEES FUNCTION
    findAllEmployees() {
        return this.connect.query(
            `
            SELECT
                e.id,
                e.first_name AS First,
                e.last_name AS Last,
                r.title AS title,
                d.name AS Department,
                r.salary AS Salary,
                CONCAT(M.first_name, " ",m.last_name) AS Manager

            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id
            `);
    },
    //  FIND ALL DEPARTMENTS FUNCTION
    findAllDepartments(){
        return this.connect.query(
            `
            SELECT
                id,
                name AS Departments
            FROM department
            ORDER BY id
            `
        )
    },
    // FIND ALL ROLES FUNCTION
    findAllRoles(){
        return this.connect.query(
            `
            SELECT
                id,
                title AS Titles,
                salary AS Salary
            FROM role
            ORDER BY id
            `
        )
    },
    //  Find all managers
    findAllPossibleManagers(employeeId){
        return this.connect.query(
            `
            SELECT id, first_name, last_name
            FROM employee
            WHERE id <> ?
            `,employeeId
        )
    },
    //  Find Employees by Department
    findAllEmployeesByDepartment(departmentId){
        return this.connect.query(
            `
            SELECT
                e.id,
                e.first_name AS First,
                e.last_name AS Last,
                r.title AS Title,
                d.name AS Department,
                r.salary AS Salary,
                CONCAT(m.first_name," ",m.last_name) AS Manager
                
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            WHERE d.id = ?
            ORDER by e.id
            `,departmentId
        )
    },
    //  Find ALl Employees by Manager
    findAllEmployeesByManager(managerId){
        return this.connect.query(
            `
            SELECT
                e.id,
                e.first_name AS First,
                e.last_name AS Last,
                r.title AS Title,
                d.name AS Department,
                r.salary AS Salary,
                CONCAT(m.first_name," ",m.last_name) AS Manager
                
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            WHERE e.manager_id = ?
            ORDER by e.id
            `,managerId
        )
    },

    //  Create Employees
    createEmployee(employee){
        return this.connect.query(
            `
            INSERT INTO employee
            SET ?
            `,employee
        )
    },
    //  Create a Department
    createDepartment(department){
        return this.connect.query(
            `
            INSERT INTO department
            SET ?
            `,department
        )
    },

    //  Create a NEW role
    createRole(role){
        return this.connect.query(
            `
            INSERT INTO role
            SET ?
            `,role
        )
    },

    //  Update an Employees Role
    updateEmployeeRole(employeeId,roleId){
        return this.connect.query(
            `
            UPDATE employee
            SET ?
            WHERE ?
            `,[{
                role_id: roleId
            },
            {
                id: employeeId
            }]
        )
    },

    // Update an Employees Manager
    updateEmployeeManager(employeeId,managerId){
        return this.connect.query(`
        UPDATE employee
        SET ?
        WHERE ?
        `, [{
            manager_id: managerId
        }, {
            id: employeeId
            }]
        )
    },
    //  Remove an Employee
    removeEmployee(employeeId){
        this.connect.query(
            `
            DELETE
            FROM employee
            WHERE id = ?
            `,employeeId
        )
    },
    //  Remove a Department
    removeDepartment(departmentId){
        this.connect.query(
            `
            DELETE
            FROM employee
            WHERE role_id = ALL (
                SELECT id
                FROM role
                WHERE department_id=?
            )
            `,departmentId
        )
        this.connect.query(
            `
            DELETE
            FROM role
            WHERE department_id = ?
            `,departmentId
        )
        this.connect.query(
            `
            DELETE
            FROM department
            WHERE id = ?
            `, departmentId
        )
    },

    // REMOVE AN EMPLOYEES ROLE

    removeRole(roleId) {
        this.connect.query(
            `
            DELETE
            FROM role
            WHERE id = ?
            `,roleId
        )
        this.connect.query(
            `
            DELETE
            FROM employee
            WHERE role_id = ?
            `,roleId
        )
    }

};




let db = dbmake(connection);
module.exports = db;