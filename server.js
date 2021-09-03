//  Dependencies
const { prompt } = require('inquirer');
const db = require ("./db");
require('console.table')
const logo = require("asciiart-logo");

//  Init, kicks off logo and questions
init();

// Declares the logo function
function init() {
    const myLogo = logo({name: "Employee Manager"}).render();
    console.log(myLogo);
    loadPrompts();
}

    // inquirer -- main menu prompts
async function loadPrompts() {

    const { choice } = await prompt([
        {
            type:"list",
            name:"choice",
            message:"What would you like to do?",
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
            return addRole();
    }
}

async function viewEmployees() {
    const employees = await db.findAllEmployees();

    console.log('\n');
    console.table(employees);

    loadPrompts();
}

async function viewEmployeesByDepartment() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id,Departments }) => ({
        name: Departments,
        value: id
    }));

    const { departmentId } = await prompt([
        {
            type:"list",
            name: "departmentId",
            message: "Which department would you like to see employees assigned to?",
            choices: departmentChoices
        }
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    loadPrompts();
}

async function viewEmployeesByManager() {
    const managers = await db.findAllEmployees();

    const managerChoices = managers.map(({ id, First, Last }) => ({
        name: `${First} ${Last}`,
        value: id
    }));

    const { managerId } = await prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which employee do you want to see direct reports for?",
            choices: managerChoices
        }
    ]);

    const employees = await db.findAllEmployeesByManager(managerId);

    console.log("\n");

    if (employees.length === 0) {
        console.log("The employee you selected has no direct reports")
    } else {
        console.table(employees);
    }

    loadPrompts();
}

async function removeEmployee(){
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, First, Last }) => ({
        name: `${First} ${Last}`,
        value: id
    }));

    const { employeeId } = await prompt ([
        {
            type:"list",
            name:"employeeId",
            message:"Which employee would you like to remove?",
            choices:employeeChoices
        }
    ]);

    await db.removeEmployee(employeeId);

    console.log("Removed employee from the database");

    loadPrompts();
}

async function updateEmployeeRole(){
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, First, Last }) => ({
        name: `${First} ${Last}`,
        value: id,
    }));

    const { employeeId } = await prompt ([
        {
            type:"list",
            name:"employeeId",
            message:"Which employees role would you like to update?",
            choices:employeeChoices
        }
    ]);

    const roles = await db.findAllRoles();

    const roleChoices = roles.map(({ id, Titles }) => ({
        name: Titles,
        value: id
    }));

    const { roleId } = await prompt([
        {
            type:"list",
            name:"roleId",
            message: "Which role would you like to assign the selected employee?",
            choices: roleChoices
        }
    ]);

    await db.updateEmployeeRole(employeeId,roleId);
    console.log("Updated employees role!");
    loadPrompts();
}

async function updateEmployeeManager(){
    const employees = await db.findAllEmployees();

    const employeeChoices = employees.map(({ id, First, Last}) => ({
        name: `${First} ${Last}`,
        value: id
    }));

    const { employeeId } = await prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Which employees manager would you like to update?",
            choices: employeeChoices
        }
    ]);

    const managers = await db.findAllPossibleManagers(employeeId);

    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
        name:`${first_name} ${last_name}`,
        value: id 
    }));

    const { managerId } = await prompt ([
        {
            type:"list",
            name:"managerId",
            message:"Which employee would you like to set as a new manager for selected Employee?",
            choices: managerChoices
        }
    ]);

    await db.updateEmployeeManager(employeeId,managerId);

    console.log("Updated employees manager!");
    loadPrompts();
}

async function viewRoles() {
    const roles = await db.findAllRoles();

    console.log("\n");
    console.table(roles);

    loadPrompts()
}

async function addRole() {
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, Departments }) => ({
        name: Departments,
        value: id
    }));

    const role = await prompt ([
        {
            name:"title",
            message:"What is the official title of the role?"
        },
        {
            name: "salary",
            message:"What is the salary of this role?"
        },
        {
            type:"list",
            name:"department_id",
            message:"Which department does this new role fall into?",
            choices: departmentChoices
        }
    ]);

    await db.createRole(role);

    console.log(`Added ${role.title} to your database`);

    loadPrompts();
}

async function removeRole(){
    const roles = await db.findAllRoles();

    const roleChoices = roles.map (({id,Titles}) => ({
        name:Titles,
        value:id
    }));

    const { roleId } = await prompt ([
        {
            type:"list",
            name:"roleId",
            message:"Which role would you like to remove? WARNING: THIS WILL REMOVE ALL EMPLOYEES WITH THIS ROLE",
            choices:roleChoices
        }
    ]);

    await db.removeRole(roleId);

    console.log("Successfully removed this role from your database!");
    loadPrompts();
}

async function viewDepartments(){
    const departments = await db.findAllDepartments();

    console.log("\n");
    console.table(departments);

    loadPrompts();
}

async function addDepartment(){
    const department = await prompt([
        {
            name:"name",
            message:"What is the name of the department you would like to add?"
        }
    ]);

    await db.createDepartment(department);

    console.log(`Successfully added ${department.name} to your database!`)

    loadPrompts();
}

async function removeDepartment(){
    const departments = await db.findAllDepartments();

    const departmentChoices = departments.map(({ id, Departments}) => ({
        name: Departments,
        value: id
    }));

    const { departmentId } = await prompt({
        type:"list",
        name:"departmentId",
        message:"Which department would you like to remove? Warning: this will remove associated roles and employees",
        choices:departmentChoices
    });

    await db.removeDepartment(departmentId);

    console.log("Successfully removed this department from database!")

    loadPrompts();
}

async function addEmployee(){
    const roles = await db.findAllRoles();
    const employees = await db.findAllEmployees();

    const employee = await prompt ([
        {
            name:"first_name",
            message:"What is the new employees first name?"
        },
        {
            name:"last_name",
            message:"What is the new employees last name?"
        },
    ]);

    const roleChoices = roles.map(({ id, Titles }) => ({
        name: Titles,
        value: id
    }));

    const { roleId } = await prompt({
        type:"list",
        name:"roleId",
        message:"What is the new employees role?",
        choices:roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, First, Last}) => ({
        name: `${First} ${Last}`,
        value: id
    }));

    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await prompt({
        type:"list",
        name:"managerId",
        message:"Who is the employee's manager?",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.createEmployee(employee);

    console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database!`);

    loadPrompts();
}
    //  Quit
function quit(){
    console.log("Goodbye!");
    process.exit();
}