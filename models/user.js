"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.CleanPlan, {
        foreignKey: "authId",
        sourceKey: "authId",
      });
    }
  }
  User.init(
    {
      authId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      snsId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      provider: DataTypes.STRING,
      nickname: DataTypes.STRING,
      userImageURL: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
