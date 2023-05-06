const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PayHist extends Model { }

PayHist.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    employee_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'id',
      },
    },
    date_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dates',
        key: 'id'
      }
    },
    due_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      references: {
        model: 'dates',
        key: 'due_date'
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'payhist',
  }
);

module.exports = PayHist;
