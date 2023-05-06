const User = require('./User');
const Employee = require('./Employee');
const Dates = require('./Dates');
const PayHist = require('./PayHist');

module.exports = { User, Employee };

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

Dates.belongsToMany(PayHist, {
    foreignKey: 'date_id',
    targetKey: 'id',
    through: 'payments'
});

// PayHist.belongsToMany(Dates, {
//     foreignKey: 'date_id',
//     through: 'payments'
// });
