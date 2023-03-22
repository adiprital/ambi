let initial = {
    currentUser: undefined
}

const authReducer = (state = initial, action) => {
    switch (action.type){
        case "updateCurrentUser":
            let updatedUser = action.user;
            return { ...state, currentUser: updatedUser };
            
        default:
            return state;
        }
}

export default authReducer;