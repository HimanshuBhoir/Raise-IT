const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({
        origin: "*"
    })
)
const mongoose = require('mongoose')
const {MONGOURI} = require('./keys')


// db schema - user
require('./models/user')
require('./models/post')

// route handler + using routes 
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// db connection
mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected',() =>{
    console.log("db connected")
})
mongoose.connection.on('error',(err) =>{
    console.log("error",err)
})


app.get('/', (req, res) => {
    res.send("hello world")
})

app.listen(5000,() => {
    console.log("server is running")
})