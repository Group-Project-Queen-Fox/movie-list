'use strict';
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: false,
          msg: 'Wrong email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,16],
          msg: 'Password at least 8 characters and maximum 16 characters'
        }
      }
    }
  }, 
  {
    hooks: {
      beforeCreate: (instance) => {
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(instance.password, salt)

        instance.password = hash
      }
    },  
    sequelize 
  });

  User.associate = function(models) {
    // associations can be defined here
  };
  
  return User;
};