


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'Login':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                userId: action.payload.userId
            }    
        case 'Logout':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null
            }
        default:
            break;
    }
}

