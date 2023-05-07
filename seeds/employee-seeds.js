const { Employee } = require('../models');

const employeeData = [
    {
        first_name: 'Tina',
        last_name: 'Croxton',
        email: 'tina@email.com',
        personal_phone: 'Password1',
        address1: '123 Main St',
        city: 'Anywhere',
        State: 'GA',
        zip: '12345',
        hire_date: '01/01/2023',
        position: 'Software Developer',
        title: 'Engineer',
        ethnicity: 'African-American',
        base_rate: '50.00',
        annual_salary: '104000.00',
        user_id: 1
    },
    {
        first_name: 'Nick',
        last_name: 'John',
        email: 'nick@gmail.com',
        personal_phone: '1234567890',
        address1: '123 Main St',
        city: 'Anywhere',
        State: 'GA',
        zip: '12345',
        hire_date: '01/01/2023',
        position: 'Software Developer',
        title: 'Senior Developer',
        ethnicity: 'White or Caucasian',
        base_rate: '40.00',
        annual_salary: '83000.00',
        user_id: 2
    }
];

const seedEmployees = () => Employee.bulkCreate(employeeData);

module.exports = seedEmployees;