'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname:DataTypes.STRING,
    lastname:DataTypes.STRING,
    contact:DataTypes.STRING,
    address:DataTypes.STRING,
    email:DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    status: DataTypes.ENUM('Y','N')
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};