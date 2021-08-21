DROP DATABASE IF EXISTS employee;
CREATE DATABASE IF NOT EXISTS employee;
USE employee;

CREATE TABLE departments (
dep_id  INT PRIMARY KEY AUTO_INCREMENT,
dep_name VARCHAR(30)
);

CREATE TABLE roles (
roles_id INT PRIMARY KEY AUTO_INCREMENT,
roles_title VARCHAR(30),
roles_salary DECIMAL,
roles_department_id INT
);

CREATE TABLE employees (
emp_id INT PRIMARY KEY,
emp_first_name VARCHAR(30),
emp_last_name VARCHAR(30),
emp_role_id INT,
emp_manager_id INT
);

INSERT INTO departments VALUES (1,'Leadership'),
(2,'Finance'),
(3,'Technical'),
(4,'HR'),
(5,'Administration');

INSERT INTO roles VALUES (101,'CEO',250000.00,1),
(102,'Leadership Team',225000.00,2),
(103,'Payroll',200000.00,2),
(104,'Software Engineer',175000.00,3),
(105,'Marketing',150000.00,3),
(106,'Sales',125000.00,2),
(107,'Assistant',10000.00,5),
(108,'Customer Service',90000.00,4);

INSERT INTO employees VALUES (1001,'Georgi','Facello',2,3),
(1002,'Bezalel','Simmel',1,4),
(1003,'Parto','Bamford',2,5),
(1004,'Chirstian','Koblick',1,5),
(1005,'Kyoichi','Maliniak',2,4),
(1006,'Anneke','Preusig',2,3),
(1007,'Tzvetan','Zielinski',5,4),
(1008,'Saniya','Kalloufi',6,5),
(1009,'Sumant','Peac',3,4),
(1010,'Duangkaew','Piveteau',1,1),
(1011,'Mary','Sluis',2,6),
(1012,'Patricio','Bridgland',2,2),
(1013,'Eberhardt','Terkki',3,4),
(1014,'Berni','Genin',5,2),
(1015,'Guoxiang','Nooteboom',3,5),
(1016,'Kazuhito','Cappelletti',2,3),
(1017,'Cristinel','Bouloucos',3,1),
(1018,'Kazuhide','Peha',1,5),
(1019,'Lillian','Haddadi',6,4),
(1020,'Mayuko','Warwick',2,4);