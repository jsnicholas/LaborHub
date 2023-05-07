const { Rep } = require('../models');

const repData = [
    {
        id: 1,
        first_name: 'Laboor',
        last_name: 'Hubble',
        email: 'laboor@gmail.com',
        phone: '5555555555'
    }
];

const seedRep = () => Rep.bulkCreate(repData);

module.exports = seedRep;