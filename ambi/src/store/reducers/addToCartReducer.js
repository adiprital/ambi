let initial = {
    product: {}
}
const addToCartReducer = (state = initial, action) => {
    switch (action.type){
        case "fetchAddToCart":
            return { ...state, product: action.products };
        default:
            return state;
        }
}

export default addToCartReducer;