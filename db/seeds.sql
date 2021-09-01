USE employees_db;
--  DEPARTMENT
INSERT INTO
  department (name)
VALUES
  ("Sales");
INSERT INTO
  department (name)
VALUES
  ("Engineering");
INSERT INTO
  department (name)
VALUES
  ("Finance");
INSERT INTO
  department (name)
VALUES
  ("Legal");
--  ROLES
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Sales Lead", 100000, 1);
-- Sales DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Salesperson", 80000, 1);
-- SALES DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Lead Engineer", 150000, 2);
-- Engineering DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Software Engineer", 120000, 2);
-- ENGINEERING DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Account Manager", 150000, 3);
-- ACCOUNTING DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Accountant", 125000, 3);
-- ACCOUNTING DEPT
INSERT INTO
  role (title, salary, department_id)
VALUES
  ("Legal Team Lead", 250000, 4);
-- LEGAL DEPT
  /* === || EMPLOYEE ARRAY || === */
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Michael Scott - Sales Lead - Sales Department */
VALUES
  ("Michael", "Scott", 1, null);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* James Halpert - Sales Lead - Sales Department */
VALUES
  ("James", "Halpert", 1, 1);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Pam Halpert - Salesperson - Sales Department */
VALUES
  ("Pam", "Halpert", 2, 2);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Dwight Schrute - Lead Engineer - Engineering Department */
VALUES
  ("Dwight", "Schrute", 3, null);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Ryan Temp - Software Engineer - Engineering Department */
VALUES
  ("Ryan", "Temp", 4, 4);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Kelly Kapour - Account Manager- Accounting Department */
VALUES
  ("Kelly", "Kapour", 5, null);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Kevin Malone - Accountant - Accounting Department */
VALUES
  ("Kevin", "Malone", 6, 6);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
  /* Phyllis Vance - Leagl Team Lead - Legal Department */
VALUES
  ("Phyllis", "Vance", 7, null);