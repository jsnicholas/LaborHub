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
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee',
        key: 'user_id',
      },
    },
    date_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'dates',
        key: 'id'
      }
    },
    paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    // due: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: true,
    //   defaultValue: DataTypes.NOW,
    //   references: {
    //     model: 'dates',
    //     key: 'due_date'
    //   }
    // },
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
