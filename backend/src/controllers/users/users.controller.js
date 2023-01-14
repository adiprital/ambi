const express = require('express');
const { signUp, 
    signIn,
    decodeToken,
    checkTokenValidity,
    checkUserIdInMongo
} = require('../../models/users.model');

const usersController = express.Router();

usersController.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    let result = await signUp(email, password);
    res.json(result);
});

usersController.post('/signin',async(req, res)=>{
    const { email, password } = req.body;
    let result = await signIn(email, password);
    if (result.success) {
        res.cookie('token',result.token,{ maxAge: 60 * 1000, httpOnly: true });  // maxAge: 2 hours
    }
    res.json(result);
});

usersController.post('/validatetoken',async(req, res)=>{
    try{
        const { token } = req.body;
        let decodeResult = decodeToken(token);
        if (decodeResult) {
            let exp = decodeResult.exp;
            const validate = checkTokenValidity(exp);
            if (validate) {
                const mongoUser = await checkUserIdInMongo(decodeResult.id);
                res.json({ user: mongoUser });
            } else {
                res.json({ user: undefined });
            }
        } else {
            res.json({ user: undefined });
        }
    } catch(error) {
        console.log(error);
        res.json(error);
    }
});

module.exports = usersController;