const express = require('express')
const User = require('../models/User')
const router = express.Router()

// create an user
router.post('/create', async (req, res) => {
    try {
        const newUser = new User( req.body )

        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (err) {
        return res.status(500).json(err)
    }
})


// get an user by username and by id
router.get('/find/', async (req, res) => {
    // query strings
    const username = req.query.username
    const userId = req.query.userId

    try {
        // by username
        if(username){
        const user = await User.findOne({ username: username })

        if(!user){
            return res.status(403).json("User doesn't exits!")
        }else{
            return res.status(200).json(user)
        }
    }else{
        // by userId
        const user = await User.findById(userId)

        if(user){
            return res.status(200).json(user)
        }else{
            return res.status(403).json("User doesn't exits!")
        }

    } 

    } catch (err) {
        return res.status(500).json(err)
    }
})

// update an user
router.put('/update/:userId', async (req, res) => {
    try {

         await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
            .then(user => res.status(200).json(user))
            .catch(err => res.status(500).json(err))
        
    } catch (err) {
        return res.status(500).json(err)
    }
})

// delete a user
router.delete('/delete/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)

        // checking user
        if(user.username === req.body.username){
            await User.findByIdAndDelete(req.params.userId)
            return res.status(200).json('User deleted!')
        }else{
            return res.status(401).json("You cannot delete this User!")
        }
    } catch (err) {
        return res.status(500).json(err)
    }
})




module.exports = router