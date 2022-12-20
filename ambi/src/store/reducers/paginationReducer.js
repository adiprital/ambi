let initial = {
    totalPages: 0,
    currentPage: 1
}

const paginationReducer = (state = initial, action) => {
    switch (action.type){
        case "initialTotalPages":
            return { ...state, totalPages: action.pages };
            
        default:
            return state;
        }
}

export default paginationReducer;