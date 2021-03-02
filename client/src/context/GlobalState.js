import React, {createContext, useReducer} from 'react';
import HabitBlock from '../utils/HabitBlock';
import AppReducer from './AppReducer';
import { ADD_HABIT } from './types';

const italianHabit = new HabitBlock("Italian","10 minutes a day");
const exerciseHabit = new HabitBlock("Exercise","half and hour a day");
const initialHabits = [italianHabit,exerciseHabit]

const initialState = {
    habits : initialHabits,
    user : {
        name: "Sandesh",
        id: "123"
    }
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    function addHabit(habit) {
        dispatch({
            type: ADD_HABIT,
            payload: habit
        });
    }

    return (
        <GlobalContext.Provider 
        value={{
            habits: state.habits,
            user: state.user,
            addHabit,
        }}
        >
            {children}
        </GlobalContext.Provider>
    )

}