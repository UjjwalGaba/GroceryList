// link to mongoose
const mongoose = require('mongoose')
const plm = require('passport-local-mongoose') // need this module so this module can be used for authorization

// define a schema for artists
const userSchema = new mongoose.Schema({
    username: String,
    password: String
})

// use passport-local-mongoose to extend this  model's functionality as it can include User Management & Authentication
userSchema.plugin(plm)

// make this model public
module.exports = mongoose.model('User', userSchema)