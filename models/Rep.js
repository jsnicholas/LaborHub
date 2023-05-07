const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rep extends Model { }

Rep.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
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
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'rep',
  }
);

module.exports = Rep;
