const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const app = express()
app.use(express.json())
mongoose.connect('mongodb+srv://saquib:Saquib123@mohammadsaquib.f3sxbno.mongodb.net/project', {
    useNewUrlParser: true
})
    .then(() => console.log("mongodb is connected"))
    .catch(err => console.log(err))
app.use('/', route)
app.listen((process.env.PORT || 3000), function () {
    console.log("express app running on port : " + (process.env.PORT || 3000))
})
