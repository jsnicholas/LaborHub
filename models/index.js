const User = require('./User');
const Employee = require('./Employee');
const Dates = require('./Dates');
const PayHist = require('./PayHist');

module.exports = { User, Employee, Dates, PayHist };

const { DataTypes } = require('sequelize');

// searching by a username can pull and employee's contact and demo info
User.hasOne(Employee, {
    foreignKey: 'user_id'
});

// searching by an EE's name or phone # can pull an EE's login info
Employee.belongsTo(User, {
    foreignKey: 'user_id'
});

Employee.hasMany(PayHist, {
    foreignKey: 'employee_id'
});

PayHist.belongsTo(Employee, {
    foreignKey: 'employee_id'
})

Dates.hasMany(PayHist, {
    foreignKey: 'date_id'
});

// PayHist.hasMany(Dates, {
//     foreignKey: 'due'
// })
// Dates.belongsToMany(PayHist)

// PayHist.belongsTo(Dates);

// Dates.belongsToMany(PayHist, {
//     through: 'payments',
//     foreignKey: 'date_id',
//     targetKey: 'id'
// });

// PayHist.belongsToMany(Dates, {
    //     through: 'payments',
//     foreignKey: 'date_id'
// });
