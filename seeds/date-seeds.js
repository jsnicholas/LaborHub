const { Dates } = require('../models');

const dateData = [
    {
        id: 1,
        due_date: '2023-06-15',
        amount: 25
    },
    {
        due_date: '2023-07-15',
        amount: 25
    },
    {
        due_date: '2023-08-15',
        amount: 25
    },
    {
        due_date: '2023-09-15',
        amount: 25
    },
    {
        due_date: '2023-10-15',
        amount: 25
    },
    {
        due_date: '2023-11-15',
        amount: 25
    },
    {
        due_date: '2023-12-15',
        amount: 25
    },
];

const seedDates = () => Dates.bulkCreate(dateData);

module.exports = seedDates;