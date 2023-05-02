const User = require('./User');
const Employee = require('./Employee');

module.exports = { User, Employee };

// searching by a username can pull and employee's contact and demo info
User.hasOne(Employee);

// searching by an EE's name or phone # can pull an EE's login info
Employee.belongsTo(User);
