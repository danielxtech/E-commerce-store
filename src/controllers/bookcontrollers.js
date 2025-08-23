const BookModel = require('../models/bookModels')
const createBook = async (req, res)=>{
  const {title,author}= req.body;

  const newBook = await BookModel.create({title,author})

  res.json(newBook)
}

module.exports = {
    createBook,
}


/*const createBook = async (req, res)=>{
const newBook = new BookModel({
  name: 'Samsung Galaxy S25 Ultra',
  price: 1000,
  discreption: 'SmartPhone'
});
}
await newBook.save();*/