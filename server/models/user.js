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
    photo:{
        type:String,
        default:"https://res.cloudinary.com/di7asyam5/image/upload/v1666962215/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws_khsfvf.jpg"
    },
    followers:[{type:ObjectId, ref:"User"}],
    following:[{type:ObjectId, ref:"User"}]
})

mongoose.model("User", userSchema)