'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Movie extends Model {}

  Movie.init({
    title: DataTypes.STRING
  }, { sequelize });

  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};