const usersDatabase = require('./users.mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const salt = 10;

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// async function saveUser(user) {
//     try {
//         await usersDatabase.updateOne({
//             email: user.email
//         }, {
//             email: user.email,
//             password: user.password
//         }, {
//             upsert: true
//         });
//     } catch(err) {
//         console.error(`Could not save user ${err}`);
//     }
// };

// async function existssUser(userEmail) {
//     return await usersDatabase.findOne({
//         email: userEmail
//     });
// }

// async function updateUserPassword(user) {
//     try {
//         await usersDatabase.updateOne({
//             email: user.email
//         }, {
//             password: user.password
//         }, {
//             upsert: true
//         });
//     } catch(err) {
//         console.error(`Could not update user password ${err}`);
//     }
// }

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
            password: encryptedPassword
        })
        return {success: true, message: 'sign up successfully!'};
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
            return { success: true, token, user: email }
        }
        return {success: false, message: 'invalid password'};
    } catch (error) {
        console.log(error);
        return {success: false, message: 'something went wrong'};
    }
}

async function verifyToken(token) {
    try {
        const verify = jwt.verify(token, JWT_SECRET);
        if (verify.type==='user'){
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(JSON.stringify(error), "error");
        return false;
    }
}

module.exports = {
    // saveUser,
    // existssUser,
    // updateUserPassword,
    verifyUserLogin,
    verifyToken,
    signUp,
    signIn
}
