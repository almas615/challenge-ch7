'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Detail_room, {
        foreignKey: 'id_room',
        sourceKey: 'id',
        as: 'detail'
      });
    }
  };
  Room.init({
    nama_room: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};