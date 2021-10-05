'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    static encrypt = (password) => bcrypt.hashSync(password, 10)
    static register = ({
      username,
      email,
      password
    }) => {
      const encryptedPassword = this.encrypt(password)
      /*
      #encrypt dari static method
      encryptedPassword akan sama dengan string
      hasil enkripsi password dari method #encrypt
      */
      return this.create({
        username,
        email,
        password: encryptedPassword,
        hak_akses: 'super_user'
      })
    }
    // Method untuk melakukan enkripsi
    checkPassword = password => bcrypt.compareSync(password, this.password)
    /* Method ini kita pakai untuk membuat JWT */
    generateToken = () => {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username
      }
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const rahasia = 'Ini rahasia ga boleh disebar-sebar'
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, rahasia)
      return token
    }

    /* Method Authenticate, untuk login */
    static authenticate = async ({
      username,
      password
    }) => {
      try {
        const user = await this.findOne({
          where: {
            username
          }
        })
        if (!user) return Promise.reject("User not found!")
        const isPasswordValid = user.checkPassword(password)
        if (!isPasswordValid) return Promise.reject("Wrong password")
        return Promise.resolve(user)
      } catch (err) {
        return Promise.reject(err)
      }
      /* Akhir dari semua yang berhubungan dengan login */
    }
  };
  User_game.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    hak_akses: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User_game',
  });
  return User_game;
};