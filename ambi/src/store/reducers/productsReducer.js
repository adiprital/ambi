let initial = {
    products: [],
    updatedProducts: [],
    searchedProducts: {}
}

const productsReducer = (state = initial, action) => {
    const updatedCartData = {...state.products};
    console.log('updatedCartData', updatedCartData);

    switch (action.type){
        case "initialProducts":
            return { ...state, products: action.products, updatedProducts: action.products };

        case "updatedProducts":
            return { ...state, updatedProducts: action.products };

        case "searchedProducts":
            // console.log('searchedProducts-action', action);
            const searchProduct = action.searchedProducts;
            console.log('searchedProducts-searchProduct', searchProduct);
            let newSearchedProducts = {};
            
            // updatedCartData.forEach((product) => {
            //     if (product.name = action.searchedProducts){
            //         newSearchedProducts[product.name] = 0;
            //         console.log('here');
            //     }
            // });

            return { ...state, searchedProducts: newSearchedProducts}
            
        default:
            return state;
        }
}

export default productsReducer;