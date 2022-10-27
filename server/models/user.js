const { default: mongoose, trusted, isObjectIdOrHexString } = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String, 
        required: true
    },
    followers:[{type:ObjectId, ref:"User"}]
})

mongoose.model("User", userSchema)