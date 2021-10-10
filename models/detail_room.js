'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Room, {
        foreignKey: 'id_room',
        sourceKey: 'id',
        as: 'room_detail'
      });
      this.belongsTo(models.User_game, {
        foreignKey: 'id_user',
        sourceKey: 'id',
        as: 'detail_user'
      });
    }
  };
  Detail_room.init({
    id_room: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    jenis_player: DataTypes.STRING,
    pilihan_player: DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    sequelize,
    modelName: 'Detail_room',
  });
  return Detail_room;
};