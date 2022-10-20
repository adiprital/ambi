
import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import addToCartReducer from './addToCartReducer';

export default combineReducers({
    productsList: productsReducer,
    addToCartList: addToCartReducer
});