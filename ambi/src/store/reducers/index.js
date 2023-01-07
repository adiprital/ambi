import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';
import paginationReducer from './paginationReducer';
import authReducer from './authReducer';

export default combineReducers({
    productsList: productsReducer,
    cartList: cartReducer,
    wishList: wishListReducer,
    paginationList: paginationReducer,
    userAuth: authReducer
});