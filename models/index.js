const User = require('./User');
const Employee = require('./Employee');
const Dates = require('./Dates');
const PayHist = require('./PayHist');
const Rep = require('./Rep');

module.exports = { User, Employee, Dates, PayHist, Rep };

const { DataTypes } = require('sequelize');

User.hasOne(Employee, {
    foreignKey: 'user_id'
});

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
