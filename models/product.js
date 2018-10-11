'use strict';
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    nameProduct: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    roast: DataTypes.STRING,
    weight: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  product.associate = function(models) {
    // associations can be defined here
  };
  return product;
};