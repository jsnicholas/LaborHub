const seedEmployees = require('./employee-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n--- DATABASE SYNCED ----\n');

    await seedUsers();
    console.log('\n---- USERS SEEDED ----\n');

    await seedEmployees();
    console.log('\n---- EMPLOYEES SEEDED ----\n');

    process.exit(0);
};

seedAll();