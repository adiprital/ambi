let initial = {
    wishListData: {}
};

const wishListReducer = (state = initial, action) => {
    const updatedWishListData = {...state.wishListData};

    switch (action.type){
        case "addProductToWishList":    
            updatedWishListData[action.product] = 1;
            return { ...state, wishListData: updatedWishListData};

        case "removeProductFromWishList":
            updatedWishListData[action.product] = 0;
            return { ...state, wishListData: updatedWishListData};

        case "wishListInitialize":
            const productArray = action.wishListData;
            let newWishListData = {};
    
            productArray.forEach((product) => {
                newWishListData[product.name] = 0;
            });
            return { ...state, wishListData: newWishListData };

        default:
            return state;
    }
};

export default wishListReducer;