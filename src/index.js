const express = require('express');
const booksRouter = require('./routes/booksRouter');
const db = require('./db');
const app = express();
const port = 3000

app.get('/prd',(req, res) =>{
res.send('"name": "Samsung Galaxy S25 Ultra", "price": "1000 $","description": "Smartphone"' )
    })

app.post('/prd',(req,res)=>{
res.send('"name": "Samsung Galaxy S25 Ultra", "price": "1000 $","description": "Smartphone"' )
})

app.put('/prd',(req,res)=>{
 res.send('"name": "Samsung Galaxy S25 Ultra", "price": "900 $","description": "Smartphone"' )
   })

app.delete('/prd',(req,res)=>{
 res.send('"name": "Samsung Galaxy S25 Ultra", "price": "900 $","description": "Smartphone"' )
   })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//d12345s
process.env.password;
