


export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'Login':
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                userId: action.payload.userId,
                rol: action.payload.rol
            }    
        case 'Logout':
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                userId: null,
                rol: null
            }
        case "ChangeRol":
        return {
            ...state,
            rol: action.payload.rol
        }
        default:
            break;
    }
}

