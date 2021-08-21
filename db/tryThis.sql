DROP DATABASE IF EXISTS employee;
CREATE DATABASE IF NOT EXISTS employee;
USE employee;

CREATE TABLE department (
    dep_id INT PRIMARY KEY,
    dep_name VARCHAR(30),
    FOREIGN KEY(dep_id) REFERENCES roles(roles_department_id) ON DELETE SET NULL
);

CREATE TABLE roles (
    roles_id INT PRIMARY KEY,
    roles_title VARCHAR(30),
    roles_salary DECIMAL,
    roles_department_id INT,
    FOREIGN KEY(roles_id) REFERENCES employee(emp_role_id) ON DELETE SET NULL
);

CREATE employee (
    emp_id INT PRIMARY KEY,
    emp_first_name VARCHAR(30),
    emp_last_name VARCHAR(30),
    emp_role_id INT,
    emp_manager_id INT
    FOREIGN KEY(emp_manager_id) REFERENCES employee(emp_id) ON DELETE SET NULL
);