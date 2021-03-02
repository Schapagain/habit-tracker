
import { ADD_HABIT } from './types';
const AppReducer = (state,action) => {
    switch(action.type) {

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