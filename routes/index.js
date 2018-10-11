const express = require('express');
const router = express.Router();

const { category,user,product } = require("../models");

const passport = require("../passport");
// const sequelize = require('sequelize')


//Regist
router.post('/regist', async(req,res)=> {
  const {firstname, lastname, contact, address, email, password, role, status } = req.body;

  const data = await user.create({firstname, lastname, contact, address, email, password, role, status})
  res.json(data)
})

// GET
router.get('/categories',passport.authenticate('jwt'), async(req,res) => {
  const data = await category.findAll();

  res.json(data)
})

//Post
router.post('/postcat',passport.authenticate('jwt'), async(req,res) => {
  const {namecategory} = req.body;

  const data = await category.create({namecategory}) 
  res.json(data)
})

//Delete
router.delete('/delcat/:id',passport.authenticate('jwt'), async(req,res) => {
  const {id} = req.params

  const data = await category.destroy({where: {id:id}})
  res.json(data)
})


//Update
router.put('/updatecat/:id',passport.authenticate('jwt'), async(req,res) => {
  const {id} = req.params;
  const {namecategory} = req.body;

  const data = {
    namecategory,
  };

  const upgrade = await category.update({namecategory}, {
    where: {id:id}
  })
  console.log(upgrade)
  res.json(data)
})

//Administrator
//GET Product
router.get('/production', async(req,res)=> {
  const data = await product.findAll();

  res.json(data)
}) 

//POST Product
router.post('/postproduct',async(req,res) => {
  const {nameProduct, price, stock, brand, type, roast, weight, image} = req.body

  // console.log(req.body)
  const data = await product.create({nameProduct, price, stock, brand, type, roast, weight, image})
  // console.log(data)
  res.json(data)

})

//DELETE Product
router.delete('/delproduct/:id', async(req,res) => {

  const {id} = req.params

  const deldata = await product.destroy({where: {id: id}})
  res.json(deldata)
})

//UPDATE Product
router.put('/updateproduct/:id', async(req,res) => {
  const {id} = req.params
  const {nameProduct, price, stock, brand, type, roast, weight, image} = req.body

  const upgrade = await product.update({nameProduct,price,stock, brand, type, roast, weight, image} ,{
    where: {id:id}
  })
  console.log(upgrade)
  res.json(upgrade)

})


module.exports = router;