// link to mongoose
const mongoose = require('mongoose')

// define a schema for grocery
const grocerySchema = new mongoose.Schema({
    groceries: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: String,
        required: true,
        trim: true
    }
})

// make this model public
module.exports = mongoose.model('Grocery', grocerySchema)