const usersDatabase = require('./users.mongo');
const bcrypt = require('bcryptjs');

async function saveUser(user) {
    try {
        await usersDatabase.updateOne({
            email: user.email
        }, {
            email: user.email,
            password: user.password
        }, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not save user ${err}`);
    }
};

async function existssUser(userEmail) {
    return await usersDatabase.findOne({
        email: userEmail
    });
}

async function updateUserPassword(user) {
    try {
        await usersDatabase.updateOne({
            email: user.email
        }, {
            password: user.password
        }, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not update user password ${err}`);
    }
}

async function verifyUserLogin(email, password) {
    try {
        const user = await usersDatabase.findOne({ email }).lean();
        if(!user){
            return { status: 'error', error: 'user not found' }
        }
        if (await bcrypt.compare(password, user.password)){
            // creating a JWT token
            token = jwt.sign({ id: user._id, 
                               username: user.email, 
                               type:'user' }, 
                            JWT_SECRET, 
                            { expiresIn: '2h' });
            return { status: 'ok', data: token }
        }
        return { status: 'error', error: 'invalid password' }
    } catch (error) {
        console.log(error);
        return { status: 'error', error: 'timed out' }
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
    saveUser,
    existssUser,
    updateUserPassword,
    verifyUserLogin,
    verifyToken
}
