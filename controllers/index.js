var express = require('express');
var router = express.Router();

// passport for authentication
const passport = require('passport')
const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Grocery List' });
});

// GET: /register
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Register'
  })
})

// POST: /register
router.post('/register', (req,res) => {
  // use User module & passport to create a new user in MongoDB, send the password separately so it cab be hashed by passport
  User.register(new User({ username: req.body.username }),req.body.password, (err, newUser) => {
    if(err) {
      console.log(err)
      res.render('register', {
        message: err``
      })
    }
    else {
      // registration succeeded. log the user in and load main artist page
      req.login(newUser, (err) => {
        res.redirect('/grocery')
      })
    }
  })
})

// GET: /login
router.get('/login', (req, res) => {
  // check the session for error message
  let messages = req.session.messages || []
  req.session.messages = []

  res.render('login', {
    title: 'Login',
    messages: messages
  })
})

// POST: /login - passport.authenticate does all the work behind the scenes to validate the login attempt
router.post('/login', passport.authenticate('local', {
  successRedirect: '/grocery',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login' // stored in the session object
}))

// GET: /logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router;
