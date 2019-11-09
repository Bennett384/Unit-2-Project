//===================================
//Dependencies
//===================================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
const session = require('express-session')
require('dotenv').config()

const routesController = require('./controllers/routes.js')


const usersController = require('./controllers/users.js');


const sessionsController = require('./controllers/sessions.js')



//===================================
//PORT
//===================================
const PORT = process.env.PORT

//===================================
//Database
//===================================
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false, useCreateIndex: true})
//===================================
//Middleware
//===================================

//be able to use delete and put routes
app.use(methodOverride('_method'))
//populate req.body with parsed info from forms
app.use(express.urlencoded({ extended: false}))
app.use((req, res, next)  => {
    next();
})
//use public folder for static assests
app.use(express.static('public'))
app.use(session({
    secret: "feedmeseymour",
    resave: false,
    saveUnitialized: false
}))
app.use('/sessions', sessionsController)
app.use('/users', usersController)
app.use('/routes', routesController)

app.get('/', (req, res) => {
    res.render('welcome.ejs')
})










// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));






//===================================
//Listener
//===================================
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})
