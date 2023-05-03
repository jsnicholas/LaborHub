const User = require('./User');
const Employee = require('./Employee');

module.exports = { User, Employee };

const { DataTypes } = require('sequelize');

// searching by a username can pull and employee's contact and demo info
User.hasOne(Employee, {
    foreignKey: {
        type: DataTypes.UUID,
        // allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
});

// searching by an EE's name or phone # can pull an EE's login info
Employee.belongsTo(User);
