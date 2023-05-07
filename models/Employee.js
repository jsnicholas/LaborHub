const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Employee extends Model { }

Employee.init(
  {
    // this will create a UUID
    // But is not necessary at the moment
    // id: {
    //   type: DataTypes.UUID,
    //   primaryKey: true,
    //   defaultValue: DataTypes.UUIDV4,
    //   unique: true
    // },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
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
      unique: true
    },
    personal_phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [10]
      },
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2]
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [5]
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sexual_orientation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hire_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: true
    },
    work_phone: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        len: [10]
      },
    },
    work_phoneext: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    base_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    annual_salary: {
      type: DataTypes.DECIMAL,
      allowNull: true
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
