const axios = require('axios')
const md5 = require('blueimp-md5')
const express = require('express');
const router = express.Router();
// const axios = require('axios')
let invoice = Date.now()
let multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})
const upload = multer({ storage: storage })

const { category, user, product, transactions, transactionsDetails } = require("../models");

const passport = require("../passport");
// const sequelize = require('sequelize')


//Regist
router.post('/regist', async (req, res) => {
  const { firstname, lastname, contact, address, email, password, role, status } = req.body;

  const data = await user.create({ firstname, lastname, contact, address, email, password, role, status })
  res.json(data)
})

// GET
router.get('/categories', passport.authenticate('jwt'), async (req, res) => {
  const data = await category.findAll();

  res.json(data)
})

//Post
router.post('/postcat', passport.authenticate('jwt'), async (req, res) => {
  const { namecategory } = req.body;

  const data = await category.create({ namecategory })
  res.json(data)
})

//Delete
router.delete('/delcat/:id', passport.authenticate('jwt'), async (req, res) => {
  const { id } = req.params

  const data = await category.destroy({ where: { id: id } })
  res.json(data)
})


//Update
router.put('/updatecat/:id', passport.authenticate('jwt'), async (req, res) => {
  const { id } = req.params;
  const { namecategory } = req.body;

  const data = {
    namecategory,
  };

  const upgrade = await category.update({ namecategory }, {
    where: { id: id }
  })
  console.log(upgrade)
  res.json(data)
})

//Administrator
//GET Product
router.get('/production', async (req, res) => {
  const data = await product.findAll();

  res.json(data)
})

//POST Product
router.post('/postproduct', upload.single('image'), async (req, res) => {
  const { nameProduct, price, stock, brand, type, roast, weight } = req.body
  const photo = req.file.filename
  // console.log(req.body)
  const data = await product.create({ nameProduct, price, stock, brand, type, roast, weight, image: photo })
  // console.log(data)
  res.json(data)

})

//DELETE Product
router.delete('/delproduct/:id', async (req, res) => {

  const { id } = req.params

  const deldata = await product.destroy({ where: { id: id } })
  res.json(deldata)
})

//UPDATE Product
router.put('/updateproduct/:id', async (req, res) => {
  const { id } = req.params
  const { nameProduct, price, stock, brand, type, roast, weight, image } = req.body

  const upgrade = await product.update({ nameProduct, price, stock, brand, type, roast, weight, image }, {
    where: { id: id }
  })
  console.log(upgrade)
  res.json(upgrade)

})

router.post('/client', async (req, res) => {
  console.log(req.body)

  const itemDetails = req.body.data.map(item => {
    return {
      name: item.name,
      price: item.price * item.count,
      quantity: item.count
    }
  })
  let totalprice = itemDetails.map(x => x.price).reduce((a, b) => a + b);

  let merchantCode = 'D4355';
  let merchantKey = 'b6924822efdd372a2600284c39a52649';
  let paymentAmount = totalprice.toString();
  let paymentMethod = 'VC';
  let merchantOrderId = invoice;
  let productDetails = 'Test Pay with Duitku';
  let email = 'setiawan.tumilin@gmail.com';
  let phoneNumber = '085365653941';
  let callbackUrl = '';
  let returnUrl = '';


  let signature = md5(merchantCode + merchantOrderId + paymentAmount + merchantKey)


  let urlSBDuitku = 'http://sandbox.duitku.com/webapi/api/merchant/inquiry';

  let params = {
    'merchantCode': merchantCode,
    'merchantKey': merchantKey,
    'paymentAmount': paymentAmount,
    'paymentMethod': paymentMethod,
    'merchantOrderId': merchantOrderId,
    'productDetails': productDetails,
    'email': email,
    'phoneNumber': phoneNumber,
    'itemDetails': itemDetails,
    'callbackUrl': callbackUrl,
    'returnUrl': returnUrl,
    'signature': signature
  }

  // console.log(params)
  let params_string = JSON.stringify(params).length
  axios({
    method: 'POST',
    url: urlSBDuitku,
    data: params,
    header: {
      'Content-Type': 'application/json',
      'Content-Length': params_string
    }
  })
    .then(x => {
      // console.log(x.data)
      res.json(x.data)
      // window.location(x.paymentUrl)
    })
    .catch(error => {
      console.log(error)
    })
  // console.log(response)
});

//Payment
router.post('/postpayment', async (req, res) => {
  const { data } = req.body

  const getdata = await transactions.create({
    orderId: invoice,
    total: data.map(item => item.price * item.count).reduce((a, b) => a + b),
    userId: 1,
  })

  for (let item of data) {
    await transactionsDetails.create({
      transactionsId: getdata.id,
      nameProduct: item.name,
      price: item.price,
      count: item.count
    })

  }
  // res.json(getdata)
})

//Raja Ongkir
router.get('/getprovince', async (req, res) => {
  const link = 'https://api.rajaongkir.com/starter/province'

  const data = await axios.get(link, {
    headers: {
      key: '8f43d3a5decdee78cb9e0382fafb5d35',
      content
    }
  })
  // console.log(data)
  res.json(data.data.rajaongkir.results)
})

router.get('/getcity', async (req, res) => {
  const link = 'https://api.rajaongkir.com/starter/city'

  const data = await axios.get(link, {
    headers: {
      key: '8f43d3a5decdee78cb9e0382fafb5d35'
    }
  })
  // console.log(data.data)
  res.json(data.data.rajaongkir.results)
})

// router.post('/')


module.exports = router;