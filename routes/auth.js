const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('../passport')

const { user } = require("../models");

// POST Login User
router.post('/login', async (req, res) => {
    
    const { email, role} = req.body

    const data = await user.findOne({
        where: {
            email:email,
            $or : {
            role:role
            }
            
        }

    })

    const coin = {
        id: data.id,
        email: data.email,
        password: data.password,
        role: data.role
    }
    const token = await jwt.sign(coin, 'your_jwt_secret')
    res.json({ token })

})

router.post('/admin', async(req,res) => {
    const {email, password} = req.body

    const data = await user.findeOne({
        where: {email: email, password: password}
    })

    const coin = {
        id: data.id,
        email: data.email,
        password: data.password
    }
    const token = await jwt.sign(coin, 'your_jwt_secret')
    res.json({token})
})

module.exports = router