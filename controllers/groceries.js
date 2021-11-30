// use express
var express = require('express');

// instantiate an express router to pass the direct url request
var router = express.Router();

// add model reference
var Groceries = require('../models/grocery')

// passport for authentication
const passport = require('passport')

// authentication check
function authCheck(req, res, next) {
    // use express built-in method to check user identity. if a user found, continue to next method
    if (req.isAuthenticated()) {
        return next()
    }

    // if no user found, go to login
    res.redirect('/login')
}


/* GET home page.  /grocery -> index view */
router.get('/', (req, res) => {
    // use Grocery model to fetch all documents from groceries collection in mongoDB
    Groceries.find((err, groceries) => {
        if(err) {
            console.log(err) // display error to console
            res.end(err)
        }
        else { // displaying index page with the title groceries
            res.render('groceries/index', {
                groceries: groceries,
                title: "Groceries",
                user: req.user
            })
        }
    })
})

// GET: /grocery/create -> display the create form for user input after checking authentication
router.get('/create', authCheck, (req,res) => {
    res.render('groceries/create', {
        title: "Add a New Groceries Item",
        user: req.user
    })
})

// POST request: /grocery/create -> process the form and save the data to database
router.post('/create', authCheck, (req,res) => {
    // use mongoose model to create new grocery document
    Groceries.create({
        groceries: req.body.groceries,
        quantity: req.body.quantity
    }, (err, newGrocery) => {
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
// GET: /grocery/edit/abc123 => show pre-populated edit form
router.get('/edit/:_id', authCheck, (req, res) => {
    // read _id from url param
    let _id = req.params._id

    // query the db for the selected grocery document
    Groceries.findById(_id, (err, grocery) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            // load the edit view and pass the selected grocery document to it for display
            res.render('groceries/edit', {
                title: "Grocery Details",
                groceries: grocery,
                user: req.user
            })
        }
    })
})

// POST: /grocery/edit/abc123 => update the existing grocery document with values from form submission
router.post('/edit/:_id', authCheck, (req,res) => {
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
router.get('/delete/:_id', authCheck, (req, res) => {
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