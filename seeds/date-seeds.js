const { Dates } = require('../models');

const dateData = [
    {
        id: 1,
        due_date: 06/15/2023,
        amount: 25
    }
];

const seedDates = () => Dates.bulkCreate(dateData);

module.exports = seedDates;