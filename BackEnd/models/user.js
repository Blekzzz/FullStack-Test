'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Event, { foreignKey: 'createdByUserId', as: 'createdEvents' });
      User.hasMany(models.Event, { foreignKey: 'vendorUserId', as: 'vendorEvents' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: { msg: "Username must be unique" },
    },
    password: DataTypes.STRING,
    role: DataTypes.ENUM('company_hr', 'vendor_admin')
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};