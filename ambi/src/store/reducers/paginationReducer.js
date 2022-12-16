let initial = {
    totalPages: 0,
    currentPage: 1
}

const paginationReducer = (state = initial, action) => {
    switch (action.type){
        case "initialTotalPages":
            console.log('action', action);
            return { ...state, totalPages: action.pages };
            
        default:
            return state;
        }
}

export default paginationReducer;