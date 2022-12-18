let initial = {
    cartData: {},
    productsPrice: {},
    totalSum: 0,
    wishListData: {}
};

const cartReducer = (state = initial, action) => {
    const updatedCartData = {...state.cartData};
    const updatedWishListData = {...state.wishListData};

    const calculateTotalSumToPay = (operator, productName) => {
        let price = state.productsPrice[productName];
        let newTotalSum = operator === '+' ? state.totalSum+price : state.totalSum-price;
        return newTotalSum;
    };

    switch (action.type){
        case "addProductToCart":
            updatedCartData[action.product] = updatedCartData[action.product] + 1;
            let newTotalSum1 = calculateTotalSumToPay('+', action.product);
            return { ...state, cartData: updatedCartData, totalSum: newTotalSum1 };

        case "removeProductFromCart":
            updatedCartData[action.product] = Math.max(updatedCartData[action.product]-1, 0);
            let newTotalSum2 = calculateTotalSumToPay('-', action.product);
            return { ...state, cartData: updatedCartData, totalSum: newTotalSum2 };

        case "addProductToWishList":    
            updatedWishListData[action.product] = 1;
            return { ...state, wishListData: updatedWishListData};

        case "removeProductFromWishList":
            updatedWishListData[action.product] = 0;
            return { ...state, wishListData: updatedWishListData};

        case "cartInitialize":
            const productArray = action.cartData;
            let newCartData = {};
            let newProductsPrice = {};
            let newWishListData = {};

            productArray.forEach((product) => {
                newCartData[product.name] = 0;
                newProductsPrice[product.name] = product.price;
                newWishListData[product.name] = 0;
            });
            return { ...state, cartData: newCartData, productsPrice: newProductsPrice, wishListData: newWishListData };

        default:
            return state;
    }
}

export default cartReducer;