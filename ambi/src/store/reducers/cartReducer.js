// let initial = {
//     product: {
//         productName: undefined,
//         amount: 0
//     }
// }

let initial = {
    cartData: {
        'Caliper': 0,
        'Measure Tape': 0
    }
}

const cartReducer = (state = initial, action) => {
    const updatedCartData = {...state.cartData}
    switch (action.type){
        case "addProductToCart":
            updatedCartData[action.product] = updatedCartData[action.product] + 1;
            return { ...state, cartData: updatedCartData };

        case "removeProductFromCart":
            updatedCartData[action.product] = Math.max(updatedCartData[action.product]-1, 0);
            return { ...state, cartData: updatedCartData };

        default:
            return state;
        }
}

export default cartReducer;