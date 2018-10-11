const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../passport')

const {user} = require("../models");
// POST Login User
router.post('/login', async(req,res) => {
    const {email, password} = req.body

    const data = await user.findOne({
        where: {email:email, password: password}
    })
    const coin = {
        id: data.id,
        emal: data.email,
        password: data.password
    }
    const token = await jwt.sign(coin,'your_jwt_secret')
    res.json({token})
    
})

// POST Login Admin
router.post('/admin', async(req,res) => {
    const {email, password} = req.body 

    const data = await user.findOne({
        where: {email:email, password:password}
    })
    const coin = {
        id: data.id,
        email: data.email,
        password: data.password, 
    }
    const token = await jwt.sign(coin, 'your_jwt_secret')
    res.json({token})
})



module.exports = router