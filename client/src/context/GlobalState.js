import React, { createContext, useCallback, useReducer } from "react";
import HabitBlock from "../utils/HabitBlock";
import AppReducer from "./AppReducer";
import { ADD_HABIT, LOGIN, LOGOUT, UPDATE_HABIT } from "./types";

const italianHabit = {
  id: 1,
  name: "Italian",
  description: "10 minutes a day and a whole lot of other description",
  blocks: [new HabitBlock(1)],
  currentBlock: 0,
};
const exerciseHabit = {
  id: 2,
  name: "Exercise",
  description: "half and hour a day",
  blocks: [new HabitBlock(2)],
  currentBlock: -1,
};
const initialHabits = [italianHabit, exerciseHabit];

const initialState = {
  habits: initialHabits,
  isAuthenticated: localStorage.getItem("token") !== null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addHabit(habit) {
    dispatch({
      type: ADD_HABIT,
      payload: habit,
    });
  }

  function updateHabit(habit) {
    dispatch({
      type: UPDATE_HABIT,
      payload: habit,
    });
  }

  function logoutUser() {
    dispatch({
      type: LOGOUT,
    });
  }

  function loginUser(user) {
    dispatch({
      type: LOGIN,
      payload: user,
    });
  }

  const getHabitDetails = useCallback((id) => {
    return state.habits?.find((habit) => habit.id == id);
  });

  return (
    <GlobalContext.Provider
      value={{
        habits: state.habits,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        addHabit,
        logoutUser,
        loginUser,
        updateHabit,
        getHabitDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
