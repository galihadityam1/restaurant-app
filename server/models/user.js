'use strict';
const bcrypt = require('bcryptjs');
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
      User.hasMany(models.Order)
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "udh terdaftar, cari email lain",
      },
      validate: {
        notNull: {
          msg: `email cannot be empty`
        },
        notEmpty: {
          msg: `email cannot be empty`
        },
        isEmail: {
          msg: "must be email format",
        },
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `password cannot be empty`
        },
        notEmpty: {
          msg: `password cannot be empty`
        },
      }
    },
    fullName: {
      type:DataTypes.STRING
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(user, options) {
        // console.log(user);
        user.password = bcrypt.hashSync(
          user.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  });
  return User;
};