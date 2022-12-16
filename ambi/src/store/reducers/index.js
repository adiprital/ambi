import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import paginationReducer from './paginationReducer';

export default combineReducers({
    productsList: productsReducer,
    cartList: cartReducer,
    paginationList: paginationReducer
});