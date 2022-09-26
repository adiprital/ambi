
let initial = {
    products: []
}
const productsReducer = (state = initial, action) => {
    switch (action.type){
        case "fetchProducts":
            return { ...state, products: action.products };
        default:
            return state;
        }
}

export default productsReducer;