const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Demographics extends Model { }

Demographics.init(
  {
    gender: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ethnicity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hourly_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'demographics',
  }
);

module.exports = Demographics;
