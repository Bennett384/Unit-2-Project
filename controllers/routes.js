const express = require('express')
const Route = require('../models/routes.js')
const router = express.Router();

//==================================
//seed data
//==================================
router.get('/seed', (req, res) => {
    Route.create(
        [
            {
                name: "Differential Equations",
                description: "This enjoyable new moderate climbs the obvious orange flake left of The Wasp",
                rating: 5.9,
                location: "Lincoln Lake, Arkansas",
                height: 35,
                anchors: "Bolt Anchors",
                bolts: 4,
                rockType: "SandStone"
            },
            {
                name: "Lincoln It Up",
                description: "Excellent face climbing protected by one of Lincoln's infamous bolt jobs. This route contains two notable runouts: one getting to the first bolt and the other getting to the anchors. Both are moderate in difficulty, but could have serious consequences. A recent hold break has upped the grade from a 5.9.",
                rating: 5.10,
                location: "Lincoln Lake, Arkansas",
                height: 40,
                anchors: "Bolt Anchors",
                bolts: 3,
                rockType: "SandStone"
            },
            {
                name: "Smeaglin' It Up",
                description: "A hard move past the first bolt leads to moderate climbing on good holds, some of which are quite hollow. The crux can be avoided by traversing in from the right- this version is more like 5.8",
                rating: 5.10,
                location: "Lincoln Lake, Arkansas",
                height: 30,
                anchors: "Bolt Anchors",
                bolts: 3,
                rockType: "SandStone"
            }
        ]
    )
})



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
        routes: allRoutes,
        username:req.session.username
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
