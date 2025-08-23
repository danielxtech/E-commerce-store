// backend-demo/models/Product.js
//const  image  = require('mongoose');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, index: true },
  price: { type: Number, required: true , min: 0},
  image: {type: String, require:  false, default: null}
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
