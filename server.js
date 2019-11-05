//===================================
//Dependencies
//===================================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
//===================================
//PORT
//===================================
const PORT = process.env.PORT

console.log(PORT);
//===================================
//Database
//===================================
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false, useCreateIndex: true})

//be able to use delete and put routes
app.use(methodOverride('_method'))

//===================================
//Routes
//===================================
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//===================================
//Middleware
//===================================
//use public folder for static assests
app.use(express.static('public'))

//populate req.body with parsed info from forms
app.use(express.urlencoded({ extended: false}))

//===================================
//Listener
//===================================
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})
