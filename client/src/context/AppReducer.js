import { ADD_HABIT, LOGOUT, LOGIN, UPDATE_HABIT } from "./types";
import { v4 as uuid } from "uuid";
import HabitBlock from "../utils/HabitBlock";

const AppReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case ADD_HABIT:
      const habitId = uuid();
      const { name, description } = action.payload;
      return {
        ...state,
        habits: [
          ...state.habits,
          {
            id: habitId,
            name,
            description,
            blocks: [new HabitBlock(habitId, action.payload.startDate)],
            currentBlock: 0,
          },
        ],
      };

    case UPDATE_HABIT:
      return {
        ...state,
        habits: state.habits.reduce(
          (acc, val) =>
            val.id === action.payload.id
              ? [...acc, action.payload]
              : [...acc, val],
          []
        ),
      };

    default:
      return state;
  }
};

export default AppReducer;
