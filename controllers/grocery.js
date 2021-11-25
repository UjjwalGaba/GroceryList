var express = require('express');
var router = express.Router();

// add model reference
var Grocery = require('../models/grocery')

/* GET home page. */
router.get('/', (req, res) => {
    // use Artist model to fetch all documents from artists collection in mongoDB
    Grocery.find((err, groceries) => {
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

// POST request
router.post('/create', (req,res) => {
    // use mongoose model to create new Artist document
    Grocery.create({
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

// Delete
router.get('/delete/:_id', (req, res) => {
    let _id = req.params._id     // get document id from url parameter

    // use mongoose to delete document and redirect
    Grocery.remove({_id: _id}, (err) => {
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