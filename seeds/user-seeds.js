const { User } = require('../models');

const userData = [
    {
        usr_name: 'tcroxton',
        password: 'password',
        email: 'tina@email.com',
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;