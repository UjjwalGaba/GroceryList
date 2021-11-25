var express = require('express');
var router = express.Router();

// add model reference
var Groceries = require('../models/grocery')

/* GET home page. */
router.get('/', (req, res) => {
    // use Artist model to fetch all documents from artists collection in mongoDB
    Groceries.find((err, groceries) => {
        if(err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.render('groceries/index', {
                groceries: groceries,
                title: "Groceries",
                user: req.user
            })
        }
    })
})

// GET create
router.get('/create', (req,res) => {
    res.render('groceries/create', {
        title: "Add a New Groceries Item",
        user: req.user
    })
})

// POST request
router.post('/create', (req,res) => {
    // use mongoose model to create new Artist document
    Groceries.create({
        groceries: req.body.groceries,
        quantity: req.body.quantity
    }, (err, newArtist) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {// save successful, update artists list view
            res.redirect('/grocery')
        }
    })
})

// Update
// GET: /artists/edit/abc123 => show pre-populated edit form
router.get('/edit/:_id', (req, res) => {
    // read _id from url param
    let _id = req.params._id

    // query the db for the selected artist document
    Groceries.findById(_id, (err, grocery) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // load the edit view and pass the selected Artist document to it for display
            res.render('groceries/edit', {
                title: "Grocery Details",
                groceries: grocery,
                user: req.user
            })
        }
    })
})

// POST: /artists/edit/abc123 => update the existing Artist document with values from form submission
router.post('/edit/:_id', (req,res) => {
    // get document id from url parameter
    let _id = req.params._id

    // use mongoose findOneAndUpdate to save changes to existing document
    Groceries.findOneAndUpdate({_id: _id}, {'groceries': req.body.groceries, 'quantity': req.body.quantity }, null, (err, artist) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/grocery')
        }
    })

})

// Delete
router.get('/delete/:_id', (req, res) => {
    let _id = req.params._id     // get document id from url parameter

    // use mongoose to delete document and redirect
    Groceries.remove({_id: _id}, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/grocery')
        }
    })
})



module.exports = router;