const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/BlogUsers')
.then(()=>{
    console.log('connected to mongodb successuflly');
})
.catch(()=>{
    console.log('connection failed');
})

const schema = new mongoose.Schema({
    postTitle:{
        type:String,
    },
    postContent:{
        type:String,
    },
    user:{
        type:String,
    },
    comments:{
        type:Array
    },
})

const collectionDB = new mongoose.model('socialPosts', schema)
module.exports = collectionDB 