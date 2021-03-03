
import { ADD_HABIT, LOGOUT } from './types';
const AppReducer = (state,action) => {
    switch(action.type) {
    
        case LOGOUT:
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