const express = require('express')
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router()

// login a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(user){
            const isMatched = await bcrypt.compare(req.body.password, user.password)

            if(isMatched){
                return res.status(200).json(user)
            }else{
                return res.status(401).json("Password incorrect!")
            }
        }else{
            return res.status(403).json("Email doesn't exits!")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

// register a user
router.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(user){
            return res.status(403).json('Email already registered!')
        }else{
            // hashing the password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            // new user instance
            const newUser = new User({
                username: req.body.username,
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })

            const savedUser = await newUser.save()
            res.status(200).json(savedUser)
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router