let initial = {
    products: [],
    updatedProducts: []
}

const productsReducer = (state = initial, action) => {

    switch (action.type){
        case "initialProducts":
            return { ...state, products: action.products, updatedProducts: action.products };

        case "updatedProducts":
            return { ...state, updatedProducts: action.products };
            
        default:
            return state;
        }
}

export default productsReducer;