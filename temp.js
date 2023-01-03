const express = require('express'); //***in app.js***
const bodyparser=require("body-parser"); //***move to app.js***               V
const mongoose= require('mongoose'); //***in users.mongo.js, mongo.js***
const jwt = require('jsonwebtoken'); //***move to users.model.js***
var cookieParser = require('cookie-parser'); //***move to app.js***           V
const port = process.env.PORT || 3000; //***in server.js***
const app = express(); //***in app.js***
require('dotenv').config(); //***in mongo.js***
const bcrypt = require('bcryptjs'); //***move to users.model.js and controller.js***            V
const salt = 10; //***move to users.controller.js***                          V
app.set('view engine', 'ejs'); //***move to app.js***
app.use(bodyparser.urlencoded({ extended: true })); //***move to app.js***    V
app.use(express.json()); //***in app.js***
app.use(cookieParser()); //***move to app.js***                               V
app.use(express.static("public")); //***move to app.js***                     V

// get our urls and secrets
const JWT_SECRET=process.env.jwt;
const MONGODB_URL=process.env.mongodb; //***in mongo.js***

// making connnection with our database - ***move to mongo.js***
mongoose.connect(MONGODB_URL, { useFindAndModify: false,
                                useNewUrlParser: true, 
                                useUnifiedTopology: true,
                                useCreateIndex: true });

// Schema For User Auth - ***in users.mongo.js***
const userSchema = new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'users'})
const User = mongoose.model("User",userSchema);

//***move to users.controller.js***
//V
app.post('/signup',async (req,res)=>{
    // geting our data from frontend
    const {email,password:plainTextPassword}=req.body;
    // encrypting our password to store in database
    const password = await bcrypt.hash(plainTextPassword, salt);
    try {
        // storing our user data into database
        const response = await User.create({
            email,
            password
        })
        return res.redirect('/');
    } catch (error) {
        console.log(JSON.stringify(error));
        if(error.code === 11000){
            return res.send({status:'error',error:'email already exists'})
        }
        throw error
    }
})

// user login function - ***move to users.model.js and import in controller.js***
//V
const verifyUserLogin = async (email, password) => {
    try {
        const user = await User.findOne({email}).lean()
        if(!user){
            return {status:'error',error:'user not found'}
        }
        if(await bcrypt.compare(password,user.password)){
            // creating a JWT token
            token = jwt.sign({id:user._id,username:user.email,type:'user'},JWT_SECRET,{ expiresIn: '2h'})
            return {status:'ok',data:token}
        }
        return {status:'error',error:'invalid password'}
    } catch (error) {
        console.log(error);
        return {status:'error',error:'timed out'}
    }
}

//***move to users.controller.js***
//V
app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    // we made a function to verify our user login
    const response = await verifyUserLogin(email,password);
    if(response.status==='ok'){
        // storing our JWT web token as a cookie in our browser
        res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
        res.redirect('/');
    }else{
        res.json(response);
    }
})

//***move to users.model.js and import in controller.js***
//V
const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if(verify.type==='user'){return true;}
        else{return false};
    } catch (error) {
        console.log(JSON.stringify(error),"error");
        return false;
    }
}

// get requests - ***move to users.controller.js***
//V
app.get('/',(req,res)=>{
    const {token}=req.cookies;
    if(verifyToken(token)){
        return res.render('home');
    }else{
        res.redirect('/login')
    }
})

app.get('/login',(req,res)=>{
    res.render('signin');
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

//***in server.js***
app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})