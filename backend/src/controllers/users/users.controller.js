const express = require('express');
const { verifyUserLogin, verifyToken } = require('../../models/users.model');
const salt = 10;

const usersController = express.Router();

usersController.post('/signup', async (req, res) => {
    // geting our data from frontend
    const { email, password: plainTextPassword } = req.body;
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
            return res.send({ status:'error',error:'email already exists' })
        }
        throw error;
    }
});

usersController.post('/signin',async(req,res)=>{
    // const { email, password } = req.body;
    // // we made a function to verify our user login
    // const response = await verifyUserLogin(email, password);
    // if(response.status==='ok'){
    //     // storing our JWT web token as a cookie in our browser
    //     res.cookie('token',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
    //     res.redirect('/');
    // }else{
    //     res.json(response);
    // }
    console.log('req.body', req.body);
    res.json(req.body.email);
})

usersController.get('/', (req, res)=>{
    const { token } = req.cookies;
    if(verifyToken(token)){
        return res.render('home');
    }else{
        res.redirect('/login')
    }
})

usersController.get('/login', (req, res)=>{
    res.render('signin');
})

usersController.get('/signup', (req, res)=>{
    res.render('signup')
})

module.exports = usersController;