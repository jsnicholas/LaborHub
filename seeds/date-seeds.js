const { Dates } = require('../models');

const dateData = [
    {
        id: 1,
        due_date: '2023-06-15',
        amount: 25
    }
];

const seedDates = () => Dates.bulkCreate(dateData);

module.exports = seedDates;