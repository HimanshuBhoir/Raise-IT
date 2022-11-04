const { default: mongoose } = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        requred: true
    },
    sub:{
        type: String,
        requred: true
    },
    body:{
        type:String,
        requred: true
    },
    photo:{
        type: String,
        requred: true
    },
    likes:[{type:ObjectId, ref:"User"}],
    comments:[{
        text: String,
        postedById:{type:ObjectId, ref:"User"}
    }],
    postedById:{
        type: ObjectId,
        ref: "User"
    }
},{timestamps:true})

mongoose.model("Post", postSchema)