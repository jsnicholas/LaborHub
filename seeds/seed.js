const seedEmployees = require('./employee-seeds');
const seedUsers = require('./user-seeds');
const seedDates = require('./date-seeds');
const seedPayhist = require('./payhist-seeds');
const seedRep = require('./rep-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n---- DATABASE SYNCED ----\n');

    await seedUsers();
    console.log('\n---- USERS SEEDED ----\n');

    await seedEmployees();
    console.log('\n---- EMPLOYEES SEEDED ----\n');

    await seedDates();
    console.log('\n---- DATES SEEDED ----\n');

    await seedPayhist();
    console.log('\n---- PAY HIST SEEDED ----\n');

    await seedRep();
    console.log('\n---- REP SEEDED ----\n')

    process.exit(0);
};

seedAll();



// const sequelize = require('../config/connection');
// const { User } = require('../models');

// const userData = require('./userData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();
