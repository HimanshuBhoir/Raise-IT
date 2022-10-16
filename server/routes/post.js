const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res) => {
    Post.find()
    .populate("postedById","_id name")
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res) => {
    const {title,body,photo} = req.body
    if(!title || !body){
        return res.status(422).json({error: "Please add all fields"})
    }
    // console.log(req.user)
    // res.send("Ok")
    const post = new Post({
        title,
        body,
        photo,
        postedById: req.user
    })
    post.save().then(result => {
        res.json({post: result})
    })
    .catch(err => {
        console.log(err)
    })
})


router.get('/mypost',requireLogin,(req,res) => {
    Post.find({postedById:req.user._id})
    .populate("postedById","_id name")
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router