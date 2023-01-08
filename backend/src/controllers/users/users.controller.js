const express = require('express');
const { verifyUserLogin, verifyToken, signUp, signIn } = require('../../models/users.model');

const usersController = express.Router();

usersController.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    let result = await signUp(email, password);
    res.json(result);
});

usersController.post('/signin',async(req,res)=>{
    const { email, password } = req.body;
    let result = await signIn(email, password);
    if (result.success) {
        res.cookie('token',result.token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true });  // maxAge: 2 hours
    }
    res.json(result);
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