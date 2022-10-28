const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/', (req,res) => {
    res.send("hello buddy")
})

router.get('/protected', requireLogin, (req, res) => {
    res.send("hello user")
})

router.post('/signup',(req,res) => {
    const {name, password, photo} = req.body
    if(!name || !password){
        return res.status(422).json({error: "Please enter right values"})
    }
    User.findOne({name:name})
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({erros:"chose another name"})
        }
        const user = new User({
            name,
            password,
            photo
        })
        user.save().then(user => {
            res.json({message: "User Saved"})
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
    })
})

router.post('/signin',(req,res) => {
    const {name, password} = req.body
    if(!name || !password){
        res.status(422).json({error: "Empty password or name"})
    }
    User.findOne({name:name})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error: "Invalid name or pasword"})
        }
        if(password === savedUser.password){
            // res.json({message: "Successfully signed in"})
            const token = jwt.sign({_id:savedUser._id}, JWT_SECRET)
            const {_id, name, followers, following, photo} = savedUser
            res.json({token, user:{_id, name, followers, following, photo}})
        }else{
            res.json({error: "Invalid name or password"})
        } 
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router
