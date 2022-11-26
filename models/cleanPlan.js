"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CleanPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "authId",
        targetKey: "authId",
        onDelete: "cascade",
      });
    }
  }
  CleanPlan.init(
    {
      cleanPlanId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      date: DataTypes.DATEONLY,
      category: DataTypes.STRING,
      title: DataTypes.STRING,
      notification: DataTypes.STRING,
      detail: DataTypes.STRING,
      isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "CleanPlan",
    }
  );
  return CleanPlan;
};
