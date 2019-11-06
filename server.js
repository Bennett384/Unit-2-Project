//===================================
//Dependencies
//===================================
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const app = express()
const db = mongoose.connection
require('dotenv').config()
const Route = require('./models/routes.js')


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
    console.log("I fun for all routes");
    next();
})
//use public folder for static assests
app.use(express.static('public'))

//===================================
//Routes
//===================================
//New Routes Page
app.get('/routes/new', (req, res) => {
    res.render('new.ejs')
})

//create new route
app.post('/routes', (req, res) => {
    Route.create(req.body, (error, createdRoute) => {
        res.redirect('/routes')
    })
})

//Index Page
app.get('/routes', (req, res) => {
    Route.find({}, (error, allRoutes) => {
        res.render('index.ejs',
    {
        routes: allRoutes
    })
    })

})

//Show Page
app.get('/routes/:id', (req, res) => {
    Route.findById(req.params.id, (error, foundRoute) => {
        res.render('show.ejs',{
            routes: foundRoute
        })
    })
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
