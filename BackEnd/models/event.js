'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, { foreignKey: 'createdByUserId', as: 'creator' });
      Event.belongsTo(models.User, { foreignKey: 'vendorUserId', as: 'vendor' });
    }
  }
  Event.init({
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    proposedDate1: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proposedDate2: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proposedDate3: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    proposedLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    remarks: {
      type: DataTypes.STRING,
    },
    confirmedDate: {
      type: DataTypes.DATE,
    },
    createdByUserId: {
      type: DataTypes.INTEGER,
    },
    vendorUserId: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};