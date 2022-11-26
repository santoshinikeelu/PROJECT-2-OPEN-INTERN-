const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const app = express()
const multer = require('multer')
app.use(express.json())
app.use(multer().any())
mongoose.connect('mongodb+srv://santoshinikeelu:tum mere ho683@cluster0.zhokymy.mongodb.net/test', {
    useNewUrlParser: true
})
    .then(() => console.log("mongodb is connected"))
    .catch(err => console.log(err))
app.use('/', route)
app.listen((process.env.PORT || 3001), function () {
    console.log("express app running on port : " + (process.env.PORT || 3001))
})
