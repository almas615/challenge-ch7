'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Detail_rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_room: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Rooms',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: false
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'User_games',
            schema: 'public'
          },
          key: 'id'
        },
        allowNull: true
      },
      jenis_player: {
        type: Sequelize.STRING,
        allowNull: true
      },
      pilihan_player: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Detail_rooms');
  }
};