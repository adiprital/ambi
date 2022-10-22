let initial = {
    product: {
        productName: undefined,
        amount: 0
    }
}
const addToCartReducer = (state = initial, action) => {
    const updatedProudctInfo = { ...state.product };
    updatedProudctInfo.productName = action.product;
    switch (action.type){
        case "addProductToCart":
            updatedProudctInfo.amount = updatedProudctInfo.amount + 1;
            return { ...state, product: updatedProudctInfo };

        case "removeProductFromCart":
            updatedProudctInfo.amount = Math.max(updatedProudctInfo.amount - 1, 0);
            return { ...state, product: updatedProudctInfo };
        default:
            return state;
        }
}

export default addToCartReducer;