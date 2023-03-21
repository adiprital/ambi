const express = require('express');
const nodemailer = require('nodemailer'); //
const { signUp, 
    signIn,
    decodeToken,
    checkTokenValidity,
    checkUserIdInMongo
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

// usersController.post('/send-message', async (req, res) => {
//     const { name, email, phone, message } = req.body;
//     console.log('req.body', req.body);

//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: EMAIL_USER,
//             pass: EMAIL_PASS
//         }
//     });

//     const mailOptions = {
//         from: `${name} ${email}`,
//         to: EMAIL_USER,
//         subject: "from Ambi's website",
//         text: `${name} (${email}) (${phone})  says: ${message}`
//     };

//     console.log('mailOptions', mailOptions);

//     transporter.sendMail(mailOptions, (error, info) => {
//         console.log('info', info);
       
//         if (error) {
//           console.error(error);
//           res.status(500).send('Error sending email');
//         } else {
//           console.log('Email sent: ' + info.response);
//           res.sendStatus(200);
//         }
//     });
// });


module.exports = usersController;