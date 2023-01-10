const usersDatabase = require('./users.mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const salt = 10;

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function signUp(email, password) {
    const user = await usersDatabase.findOne({email});
    if (user) {
        return {success: false, message: 'email already exists'};
    }
    // encrypting our password to store in database
    const encryptedPassword = await bcrypt.hash(password, salt);
    try {
        // storing our user data into database
        const response = await usersDatabase.create({
            email,
            password: encryptedPassword,
            balance: 100
        })
        return {success: true, message: 'sign up successfully!', user: email, balance: response.balance };
    } catch (error) {
        console.log(JSON.stringify(error));
        return {success: false, message: 'something went wrong'};
    }
}

async function signIn(email, password) {
    // we made a function to verify our user login
    const response = await verifyUserLogin(email, password);
    return response;
}

async function verifyUserLogin(email, password) {
    try {
        const user = await usersDatabase.findOne({ email }).lean();
        if(!user){
            return {success: false, message: 'user not found'};
        }
        if (await bcrypt.compare(password, user.password)){
            // creating a JWT token
            token = jwt.sign({ id: user._id, 
                               username: user.email, 
                               type:'user' }, 
                            JWT_SECRET, 
                            { expiresIn: '2h' });
            return { success: true, token, user: email, balance: user.balance }
        }
        return {success: false, message: 'invalid password'};
    } catch (error) {
        console.log(error);
        return {success: false, message: 'something went wrong'};
    }
}

 function decodeToken(token) {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        return { id: verify.id, exp: verify.exp }
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        return undefined;
    }
}

 function checkTokenValidity(exp) {
    let expiredDate = moment.unix(exp);
    let now = moment();

    if(now.isBefore(expiredDate)){
        // token is stil valid becuase current time is before expiration time
        return true;
    }
    else{
        // token EXPIRED because current time after expiration time
        return false;
    }
}

async function checkUserIdInMongo(id) {
    try {
        const user = await usersDatabase.findOne({ _id: id });
        if(!user){
            return { success: false, message: 'user not found' };
        }
        else { 
            return { success: true, user: id, email: user.email, balance: user.balance }
        } 
    } catch (error) {
        console.log(error);
        return { success: false, message: 'something went wrong' };
    }
}

async function updateBalance(mongoUser, newBalance) {
    try {
        await usersDatabase.updateOne({
            email: mongoUser.email
        }, {
            balance: newBalance,
        }, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not update user's balance ${err}`);
    }
}

module.exports = {
    signUp,
    signIn,
    decodeToken,
    checkTokenValidity,
    checkUserIdInMongo,
    updateBalance
}
