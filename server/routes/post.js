const express = require('express')
const Post = require('../models/Post')
const User = require('../models/User')
const router = express.Router()

// create a post
router.post('/create', async (req, res) => {
    try {
        const newPost = new Post(req.body)

        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// update a post
router.put('/update/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)

        if(post.userId === req.body.userId){
            const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, {new:true})
            return res.status(200).json(updatedPost)
        }else{
            return res.status(500).json(err.message)
        }
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

// get a post 
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)

        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get all timeline posts
router.get('/all/timeline', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// get all posts of an user
router.get('/all/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId })

        res.status(200).json(posts)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// delete a post
router.delete('/delete/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        
        if(req.body.userId === post.userId){
            try {
                await post.delete()
                return res.status(200).json("Post deleted!")
            } catch (err) {
                console.log(err)
            }
        }else{
            return res.status(401).json("You can delete only your posts!")
        }

    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router