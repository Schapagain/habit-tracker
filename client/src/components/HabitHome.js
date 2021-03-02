import React from 'react';
import { Redirect } from 'react-router-dom';
import HabitBlock from '../utils/HabitBlock';
import CalendarGrid from './CalendarGrid';


const HabitHome = ({location}) => {
    const habit = location.state && location.state.habit;
    const mainClass = "flex flex-col w-full"
  return habit && habit instanceof HabitBlock ? (
    <div className={mainClass}>
        <div className="relative mb-5 m-auto w-full sm:w-2/3 lg:w-1/2 h-full">
            <CalendarGrid block={habit} />
        </div> 
      </div>
  ) : (
      <Redirect to="/home" />
  )
}

export default HabitHome;