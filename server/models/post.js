const { default: mongoose } = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        requred: true
    },
    body:{
        type:String,
        requred: true
    },
    photo:{
        type: String,
        default: ""
    },
    postedById:{
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Post", postSchema)