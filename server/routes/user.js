const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")


router.get('/user/:id',requireLogin, (req,res) => {
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Post.find({postedById:req.params.id})
        .populate("postedById","_id name")
        .exec((err,posts) => {
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    }).catch(err => {
        return res.status(404).json({error:"User not found"})
    })
})


router.put('/follow',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{new: true})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        return res.status(422).json({error:err})
    })
})


router.put('/unfollow',requireLogin,(req,res) => {
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{new: true})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        return res.status(422).json({error:err})
    })
})




module.exports = router