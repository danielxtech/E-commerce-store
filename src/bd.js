const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:3000/prd')

const db = mongoose.connection;
db.on('error' ,console.error)
db.on('open',()=>{
    console.log('Connected to MongoDB !')
})
mongoose.connect('mongodb+srv://dansb:d12345s@cluster0.sdgew2h.mongodb.net/library')
.then(()=>{
    console.log('Connected to DB')
})
.catch(()=>{
    console.log('unable to connect to DB')
});