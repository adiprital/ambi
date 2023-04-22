const usersDatabase = require('./users.mongo');
const productsDatabase = require('./products.mongo');
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
        return {success: true, message: 'sign up successfully! - please Sign In.', user: email, balance: response.balance.toFixed(2) };
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
                            { expiresIn: '30m' });
            return { success: true, token, user: email, balance: user.balance.toFixed(2), purchases: user.purchases }
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
        // token is still valid because current time is before expiration time
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
            return { success: true, user: id, email: user.email, balance: user.balance.toFixed(2), purchases: user.purchases }
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
            balance: newBalance.toFixed(2),
        }, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not update user's balance ${err}`);
    }
}

async function updatePurchases(mongoUser, purchasesProduct) {
    try {
        let res = await usersDatabase.findOne({ email: mongoUser.email });

        // If no product has been purchased previously by the user - Adds product to user's purchase list.
        if (!res.purchases) {
            await usersDatabase.updateOne({
                email: mongoUser.email
            }, {
                purchases: purchasesProduct,
            }, {
                upsert: true
            });
        }

        // if purchases have been made previously by the user:
        // res.purchases = previous purchases.
        // purchasesProduct = current purchase.
        if (res.purchases) {
            Object.keys(purchasesProduct).forEach(purchas => {
                if ( purchas in res.purchases ){
                    // update product's purchase quantity.
                    res.purchases[purchas] = purchasesProduct[purchas] + res.purchases[purchas];
                } else {
                    // Adds product to my purchase list.
                    res.purchases[purchas] = purchasesProduct[purchas];
                }
            });

            await usersDatabase.updateOne({
                email: mongoUser.email
            }, {
                purchases: res.purchases,
            }, {
                upsert: true
            });

        }

    } catch(err) {
        console.error(`Could not update user's purchases ${err}`);
    }
}

async function getUserWishList(mongoUserId) {
    try {
        let res = await usersDatabase.findOne({ '_id': mongoUserId });
        let wishListIds = res.wishList;
        let promises_array = wishListIds.map(async productId => {
            try {
                return await productsDatabase.findOne({'_id': productId});
            } catch(err) {
                console.error(`Could not find product ${err}`);
                return undefined;
            }
        })

        let wishListItemsArr = await Promise.all(promises_array);
        let filterArray = wishListItemsArr.filter(product => product !== undefined);

        if (res) {
            return {
                success: true,
                wishList: filterArray
            };
        }
    } catch(err) {
        console.error(`Error in GET wishList ${err}`);
        return {
            success: false,
            error: err
        };
    }

}

async function addToWishList(mongoUserId, wishListProductId) {


    try {
        let res = await usersDatabase.findOne({ _id: mongoUserId});

        // If product is not in wishlist - Adds product to user's wish list.
        if (Array.isArray(res.wishList) && res.wishList.length === 0) {
            await usersDatabase.updateOne({
                _id: mongoUserId
            }, {
                wishList: [wishListProductId],
            }, {
                upsert: true
            });
        }

        // If the product is in the wishlist: ????????????????????
        if (Array.isArray(res.wishList) && res.wishList.length > 0) {
            let newWishList = [...res.wishList];
            if (!newWishList.includes(wishListProductId)) {
                newWishList.push(wishListProductId);
                await usersDatabase.updateOne({
                    _id: mongoUserId
                }, {
                    wishList: newWishList
                }, {
                    upsert: true
                });
            }
        }

    } catch(err) {
        console.error(`Could not update user's wishlist ${err}`);
    }
}

async function removeFromWishList(mongoUser, wishListProduct) {
    try {
        let res = await usersDatabase.findOne({ email: mongoUser.email });

        // If user wants to remove the product from wishlist: 
        // The product is in the wishlist:
        if (res.wishList) {
            await usersDatabase.deleteOne({
                email: mongoUser.email
            }, { 
                wishList: wishListProduct 
            });
        }

    } catch(err) {
        console.error(`Could not delete from user's wishlist ${err}`);
    }
}

module.exports = {
    signUp,
    signIn,
    decodeToken,
    checkTokenValidity,
    checkUserIdInMongo,
    updateBalance,
    updatePurchases,
    getUserWishList,
    addToWishList,
    removeFromWishList
}
