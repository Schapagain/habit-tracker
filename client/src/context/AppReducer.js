
import { ADD_HABIT, LOGOUT, LOGIN } from './types';
const AppReducer = (state,action) => {
    switch(action.type) {
    
        case LOGIN:
            console.log('logging in user:',action.payload);
            localStorage.setItem('token','123');
            localStorage.setItem('user',JSON.stringify(action.payload))
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            }

        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }

        case ADD_HABIT:
            return {
                ...state,
                habits: [...state.habits,action.payload]
            }

        default:
            return state;
    }
}

export default AppReducer;