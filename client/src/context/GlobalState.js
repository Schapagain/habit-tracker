import React, {createContext, useReducer} from 'react';
import HabitBlock from '../utils/HabitBlock';
import AppReducer from './AppReducer';
import { ADD_HABIT, LOGIN, LOGOUT } from './types';

const italianHabit = new HabitBlock("Italian","10 minutes a day");
const exerciseHabit = new HabitBlock("Exercise","half and hour a day");
const initialHabits = [italianHabit,exerciseHabit]

const initialState = {
    habits : initialHabits,
    isAuthenticated: localStorage.getItem('token') !== null,
    user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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

    function logoutUser() {
        dispatch({
            type: LOGOUT,
        })
    };

    function loginUser(user) {
        dispatch({
            type: LOGIN,
            payload: user,
        })
    }

    return (
        <GlobalContext.Provider 
        value={{
            habits: state.habits,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            addHabit,
            logoutUser,
            loginUser,
        }}
        >
            {children}
        </GlobalContext.Provider>
    )

}