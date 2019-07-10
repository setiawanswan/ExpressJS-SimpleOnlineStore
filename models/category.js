'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    namecategory: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};