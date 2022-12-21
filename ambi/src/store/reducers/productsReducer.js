let initial = {
    products: [],
    updatedProducts: []
}

const productsReducer = (state = initial, action) => {

    switch (action.type){
        case "initialProducts":
            console.log('initialProducts', action.products);
            return { ...state, products: action.products, updatedProducts: action.products };

        case "updatedProducts":
            console.log('updatedProducts', action.products);
            return { ...state, updatedProducts: action.products };
            
        default:
            return state;
        }
}

export default productsReducer;