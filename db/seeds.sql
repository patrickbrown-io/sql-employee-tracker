INSERT INTO
  department (name)
VALUES
  ('Sales'),
  ('IT'),
  ('Customer Service'),
  ('Engineering'),
  ('Pricing');
INSERT INTO
  role (title, salary, department_id)
VALUES
  ('Standard Salesperson', 50000, 1),
  ('Manager of Sales', 90000, 1),
  ('Junior Tech Support', 100000, 2),
  ('Lead Tech Support', 150000, 2),
  ('Customer Support Technician', 40000, 3),
  ('Lead Customer Service', 80000, 3),
  ('Junior Engineer', 70000, 4),
  ('Senior Engineer', 120000, 4),
  ('Pricing Analyst', 60000, 4),
  ('Lead Pricing Analyst', 70000, 4);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Michael', 'Scott', 1, NULL),
  ('Jim', 'Halpert', 2, 1),
  ('Dwight', 'Schrute', 3, NULL),
  ('Stanley', 'Hudson', 4, 3),
  ('Phylis', 'Vance', 5, NULL),
  ('Meredith', 'Palmer', 6, 5),
  ('Kevin', 'Malone', 7, NULL),
  ('Angela', 'Martin', 8, 7);