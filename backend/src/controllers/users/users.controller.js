const express = require('express');
const nodemailer = require('nodemailer'); //
const { signUp, 
    signIn,
    decodeToken,
    checkTokenValidity,
    checkUserIdInMongo,
    getUserWishList,
    addToWishList,
    removeFromWishList
} = require('../../models/users.model');

const usersController = express.Router();

require('dotenv').config();
const EMAIL_USER = process.env.GMAIL_USER;
const EMAIL_PASS = process.env.GMAIL_PASSWORD;

usersController.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    let result = await signUp(email, password);
    res.json(result);
});

usersController.post('/signin', async (req, res)=>{
    const { email, password } = req.body;
    let result = await signIn(email, password);
    if (result.success) {
        res.cookie('token',result.token,{ maxAge: 30 * 60 * 1000, httpOnly: true });  // maxAge: 30 minutes
    }
    res.json(result);
});

usersController.post('/validatetoken', async (req, res)=>{
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

usersController.post('/add-to-wishlist', async (req, res) => {
    let token = req.headers['token'];
    let productId = req.body.wishListProductId;
    if(!token){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let resultDecode = decodeToken(token);
    if(!resultDecode) {
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let { id, exp } = resultDecode; // id = userId
    if(!exp){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    if(!checkTokenValidity(exp)){
        return res.json({
            error: 'session token expired - login again.'
        });
    }

    await addToWishList(id, productId);
    return res.status(200).json('OK');

});

usersController.post('/remove-from-wishlist', async (req, res) => {
    let token = req.headers['token'];
    let productId = req.body.wishListProductId;
    if(!token){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let resultDecode = decodeToken(token);
    if(!resultDecode) {
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let { id, exp } = resultDecode; // id = userId
    if(!exp){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    if(!checkTokenValidity(exp)){
        return res.json({
            error: 'session token expired - login again.'
        });
    }

    await removeFromWishList(id, productId);
    return res.status(200).json('OK');
});

usersController.get('/get-user-wishlist', async (req, res) => {
    let token = req.headers['token'];
    if(!token){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let resultDecode = decodeToken(token);
    if(!resultDecode) {
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let { id, exp } = resultDecode; // id = userId
    if(!exp){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    if(!checkTokenValidity(exp)){
        return res.json({
            error: 'session token expired - login again.'
        });
    }


    let result = await getUserWishList(id);
    return res.status(200).json(result);
});



// usersController.post('/send-message', async (req, res) => {
//     const { name, email, phone, message } = req.body;
//     // console.log('req.body: ', req.body);

//   const transporter = nodemailer.createTransport({
//     // service: 'smtp.gmail.com',
//     host: 'smtp.gmail.com',
//     port: 993,
//     secure: true, // use TLS
//     auth: {
//       user: EMAIL_USER,
//       pass: EMAIL_PASS
//     }
//   });
// //   console.log('transporter: ', transporter);

//   const mailOptions = {
//     host: 'smtp.gmail.com',
//     secure: true, // use TLS
//     // port: 465,
//     from: email,
//     to: EMAIL_USER,
//     subject: "from Ambi's website",
//     text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
//   };
//   console.log('mailOptions: ', mailOptions);

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).send('Something went wrong');
//     } else {
//       console.log('Email sent: ' + info.response);
//       res.send('Email sent successfully');
//     }
//   });

// });

module.exports = usersController;