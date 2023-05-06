const { PayHist } = require('../models');

const payhistData = [
    {
        paid: 0
    }
];

const seedPayhist = () => PayHist.bulkCreate(payhistData);

module.exports = seedPayhist;