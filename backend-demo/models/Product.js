// backend-demo/models/Product.js
//const  image  = require('mongoose');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: {type: String, require: true}
});


module.exports = mongoose.model('Product', productSchema);
