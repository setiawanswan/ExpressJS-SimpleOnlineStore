'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define('transactions', {
    orderId: DataTypes.STRING,
    total: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {});
  transactions.associate = function(models) {
    // associations can be defined here
  };
  return transactions;
};