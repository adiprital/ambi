let initial = {
    products: [],
    updatedProducts: [],
    searchProducts: []
}

const productsReducer = (state = initial, action) => {
    switch (action.type){
        case "initialProducts":
            return { ...state, products: action.products, updatedProducts: action.products };

        case "updatedProducts":
            return { ...state, updatedProducts: action.products };

        case "searchProducts":
            return { ...state, searchProducts: action.searchProducts };

            
        default:
            return state;
        }
}

export default productsReducer;