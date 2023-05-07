const { User } = require('../models');

const userData = [
    {
        usr_name: 'tcroxton',
        password: 'Password1',
        email: 'tina@email.com',
    },
    {
        usr_name: 'njohnson',
        password: '123456789',
        email: 'nick@email.com'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;