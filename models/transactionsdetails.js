'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactionsDetails = sequelize.define('transactionsDetails', {
    transactionsId: DataTypes.INTEGER,
    nameProduct: DataTypes.STRING,
    price: DataTypes.STRING,
    count: DataTypes.STRING
  }, {});
  transactionsDetails.associate = function(models) {
    // associations can be defined here
  };
  return transactionsDetails;
};