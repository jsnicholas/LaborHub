const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model { }

Employee.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      references: {
        model: 'user',
        key: 'usr_name'
      }

    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personal_phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    work_phone: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    work_phoneext: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    base_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    annual_salary: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee',
  }
);

module.exports = Employee;
