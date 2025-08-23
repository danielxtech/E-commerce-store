const mongoose = require('mongoose')


const bookSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    price: {
        type : Number,
        required: true
    },
    discreption: {
        type : String,
        required: true
    }
})

const mongoose = mongoose.models('Book', bookSchema)

module.exports = models;




/*const bookSchema = mongoose.Schema({
    title: string ,
    author: String
})

const model = mongoose.model('Book', bookSchema)

module.exports = model;*/
