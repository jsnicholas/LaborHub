const { PayHist } = require('../models');

const payhistData = [
    {
        employee_id: 1,
        paid: 0,
        date_id: 1,
    }
];

const seedPayhist = () => PayHist.bulkCreate(payhistData);

module.exports = seedPayhist;