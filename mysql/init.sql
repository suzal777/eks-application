-- Create the database
CREATE DATABASE IF NOT EXISTS companydb;
USE companydb;

-- Create Employees table
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

-- Create Departments table
CREATE TABLE IF NOT EXISTS departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create Payrolls table
CREATE TABLE IF NOT EXISTS payrolls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT NOT NULL,
    salary DECIMAL(10,2),
    month VARCHAR(20),
    FOREIGN KEY (employeeId) REFERENCES employees(id)
);
