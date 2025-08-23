const express = require('express');
const { createBook } = require('../controllers/bookcontrollers');
const router = express.Router();

router.get('/',(req, res)=>{
    res.json({message:'All Book'})
})

router.get('/:1',(req, res)=>{
    res.json({message:'Single Book'})
})

router.post('/',createBook);

router.put('/:1',(req, res) =>{
    res.json({message: 'Book updated'});
});

router.delete('/:1',(req,res)=>{
    res.json({message:'Book Delete'});
});