const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/BlogUsers')
.then(()=>{
    console.log('connected to mongodb successuflly');
})
.catch(()=>{
    console.log('connection failed');
})

const schema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})

const collectionDB = new mongoose.model('usersInfo', schema)
module.exports = collectionDB 