let initial = {
    cartData: {}
}

const cartReducer = (state = initial, action) => {
    const updatedCartData = {...state.cartData};

    switch (action.type){
        case "addProductToCart":
            updatedCartData[action.product] = updatedCartData[action.product] + 1;
            return { ...state, cartData: updatedCartData };

        case "removeProductFromCart":
            updatedCartData[action.product] = Math.max(updatedCartData[action.product]-1, 0);
            return { ...state, cartData: updatedCartData };

        case "cartInitialize":
            const productArray = action.cartData;
            let newCartData = {};

            productArray.forEach((product) => {
                newCartData[product.name] = 0;
            });
            return { ...state, cartData: newCartData};

        default:
            return state;
    }
}

export default cartReducer;