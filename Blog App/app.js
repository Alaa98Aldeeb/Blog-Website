var express = require('express')
var app = express()
const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId
var db = require('./controllers/database')
var postSportDb = require('./controllers/sportPosts')
var postArtisttDb = require('./controllers/artistPosts')
var postEduDb = require('./controllers/eduPosts')
var postFashionDb = require('./controllers/fashionPosts')
var postSocialDb = require('./controllers/socialPosts')
var postTechnoDb = require('./controllers/techPosts')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var fs = require('fs');
const passport = require('passport');
const { ObjectId } = require('mongodb')
// to get space in url we can use %20 as charachter code for space
var userName = 'Guest'
var postID
var category

app.set('view engine', 'ejs');
app.use('/stylesheet', express.static('stylesheet'))
app.use('/images', express.static('images'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/Blog%20App', function(req, res){
    userName = 'Guest'
    res.render('index', {userName:userName});
});

app.get('/backToMainPage', function(req, res){
    res.render('index', {userName: userName})
})

app.get('/Blog%20Doors/post%20add', function(req, res){
    category = req.query.type
    res.render('postLayout')
});

app.post('/Blog%20Doors/post%20add', urlencodedParser , async(req,res)=>{
   console.log(category)
   const post = {
    postTitle:req.body.title,
    postContent:req.body.content,
    user:userName,
    comments:[],
    }
   if(category=='sport'){
    await postSportDb.insertMany([post])

   }else if(category=='techno'){
    await postTechnoDb.insertMany([post])

   }else if(category=='social'){
    await postSocialDb.insertMany([post])

   }else if(category=='fashion'){
    await postFashionDb.insertMany([post])

   }else if(category=='edu'){
    await postEduDb.insertMany([post])

   }else{
    await postArtisttDb.insertMany([post])
   }
   res.redirect('/backToCategory')
});

app.get('/backToCategory', function(req, res){
    if(category=='sport'){
        postSportDb.find((err, list)=>{
            if(!err){
                res.render('sport',{user:userName,data:list})
            }else console.log("error occured")
        });
    
       }else if(category=='techno'){
        postTechnoDb.find((err, list)=>{
            if(!err){
                res.render('techno',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='social'){
        postSocialDb.find((err, list)=>{
            if(!err){
                res.render('social',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='fashion'){
        postFashionDb.find((err, list)=>{
            if(!err){
                res.render('fashion',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='edu'){
        postEduDb.find((err, list)=>{
            if(!err){
                res.render('education',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else{
        postArtisttDb.find((err, list)=>{
            if(!err){
                res.render('artist',{user:userName,data:list})
            }else console.log("error occured")
        })
       }
})

app.get('/Blog%20Doors/category', function(req, res){
   if(userName == 'Guest'){
    res.render('login',{check:true});
   }else{
    category = req.query.type
    if(category=='sport'){
        postSportDb.find((err, list)=>{
            if(!err){
                res.render('sport',{user:userName,data:list})
            }else console.log("error occured")
        })
    
    }else if(category=='techno'){
        postTechnoDb.find((err, list)=>{
            if(!err){
                res.render('techno',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='social'){
        postSocialDb.find((err, list)=>{
            if(!err){
                res.render('social',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='fashion'){
        postFashionDb.find((err, list)=>{
            if(!err){
                res.render('fashion',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else if(category=='edu'){
        postEduDb.find((err, list)=>{
            if(!err){
                res.render('education',{user:userName,data:list})
            }else console.log("error occured")
        })
    
       }else{
        postArtisttDb.find((err, list)=>{
            if(!err){
                res.render('artist',{user:userName,data:list})
            }else console.log("error occured")
        })
       }
   }
    
});
app.get('/Blog%20Doors/register%20form', function(req, res){
    res.render('register');
});

app.post('/Blog%20Doors/register%20form',urlencodedParser , async(req,res)=>{
    const user = {
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }
    await db.insertMany([user])
    res.render('login',{check:true})

});
app.get('/Blog%20Doors/login%20form', function(req, res){
    res.render('login',{check:true});
});
app.post('/Blog%20Doors/login%20form',urlencodedParser , async(req,res)=>{
    try{
        const userValidateData = await db.findOne({email:req.body.email})
        if(userValidateData ==null){
            res.render('login',{check:false});
        }else{
            if(userValidateData.password === req.body.password){
                userName = userValidateData.name
                res.render('index', {userName:userValidateData.name})
            }else{
                res.render('login',{check:false});
            }
        }
        
    }catch{

    }

});

app.get('/Blog%20Doors/add%20comment',function(req, res){
    postID = req.query.id
    console.log(postID)
    res.render('addComment')
    // console.log(req.query.id)
});

app.get('/add%comment%to%post', function(req, res){
    res.render('addComment')
})

app.post('/add%comment%to%post', urlencodedParser, async(req, res)=>{
    console.log(req.query.id)

    const comment = {
        comment:req.body.comment,
        userComment:userName,
    }
    var condition = new ObjectId(postID)

    if(category=='sport'){
        await  postSportDb.update({_id:condition},{$push:{comments:comment}})
    
       }else if(category=='techno'){
        await  postTechnoDb.update({_id:condition},{$push:{comments:comment}})
    
       }else if(category=='social'){
        await  postSocialDb.update({_id:condition},{$push:{comments:comment}})
    
       }else if(category=='fashion'){
        await  postFashionDb.update({_id:condition},{$push:{comments:comment}})
    
       }else if(category=='edu'){
        await  postEduDb.update({_id:condition},{$push:{comments:comment}})
    
       }else{
        await  postArtisttDb.update({_id:condition},{$push:{comments:comment}})
       }
       console.log(category)
        res.redirect('/backToCategory')
 });

app.listen(3000)


