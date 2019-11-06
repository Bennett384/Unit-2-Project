const express = require('express')
const Route = require('../models/routes.js')
const router = express.Router();

//===================================
//Routes
//===================================
//New Routes Page
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//Edit Page
router.get('/:id/edit', (req, res) => {
    Route.findById(req.params.id, (error, foundRoute) => {
        res.render('edit.ejs', {
            routes: foundRoute
        })
    })
})
//delete route
router.delete('/:id', (req, res) => {
    Route.findByIdAndRemove(req.params.id, (error, data) => {
        console.log(data);
        res.redirect('/routes')
    })
})

//create new route
router.post('/', (req, res) => {
    Route.create(req.body, (error, createdRoute) => {
        res.redirect('/routes')
    })
})

//update route
router.put('/:id', (req, res) => {
    Route.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updateModel) => {
        res.redirect('/routes')
    })
})

//Index Page
router.get('/', (req, res) => {
    Route.find({}, (error, allRoutes) => {
        res.render('index.ejs',
    {
        routes: allRoutes
    })
    })

})

//Show Page
router.get('/:id', (req, res) => {
    Route.findById(req.params.id, (error, foundRoute) => {
        res.render('show.ejs',{
            routes: foundRoute
        })
    })
})

module.exports = router;
