'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User_game_biodata, {
        foreignKey: 'user_id',
        as: 'biodata',
        onDelete: 'cascade'
      });

      this.hasMany(models.User_game_history, {
        foreignKey: 'user_id'
      })
    }
  };
  User_game.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_game',
  });
  return User_game;
};