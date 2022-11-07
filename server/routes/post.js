const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")


router.get('/allpost',requireLogin,(req,res) => {
    Post.find()
    .populate("postedById","_id name photo")
    .sort('-createdAt')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/subposts',requireLogin,(req,res) => {
    Post.find({postedById:{$in:req.user.following}})
    .populate("postedById","_id name photo")
    .sort('-createdAt')
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/trendpost',requireLogin,(req,res) => {
    Post.find({})
    .populate("postedById","_id name photo")
    .sort({"likes":-1, "createdAt":-1})
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/recent',requireLogin,(req,res) => {
    Post.find()
    .populate("postedById","_id name photo")
    .sort('-createdAt')
    .limit(1)
    .then(posts => {
        res.json({posts})
    })
    .catch(err => {
        console.log(err)
    })
})


router.post('/createpost',requireLogin,(req,res) => {
    const {title,body,photo,sub} = req.body
    if(!title || !body || !sub){
        return res.status(422).json({error: "Please add all fields"})
    }
    // console.log(req.user)
    // res.send("Ok")
    const post = new Post({
        title,
        sub,
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
    .populate("postedById","_id name photo")
    .sort('-createdAt')
    .then(mypost => {
        res.json({mypost})
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/like', requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postedById,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postedById,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin,(req,res) => {
    const comment ={
        text: req.body.text,
        postedById: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postedById,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedById","_id name")
    .populate("postedById","_id name")
    .exec((err, result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin,(req,res) => {
    Post.findOne({_id:req.params.postId})
    .populate("postedById","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedById._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result => {
                res.json(result)
            }).catch(err => {
                console.log(err)
            })
        }
    })

})

module.exports = router