import React from 'react';
import { Redirect } from 'react-router-dom';
import HabitBlock from '../utils/HabitBlock';
import CalendarGrid from './CalendarGrid';
import NavBar from './NavBar';
import HabitInsights from './HabitInsights';
import BackButton from './BackButton';

const HabitHome = ({location}) => {
    const habit = location.state && location.state.habit;
  return habit && habit instanceof HabitBlock ? (
    <div className="flex min-h-screen flex-col w-full">
          <NavBar />
          <div className="flex m-auto">
            <BackButton className="my-auto hover:-translate-x-1"/>
           <div className="m-auto flex flex-col justify-center">
            <div className="p-4">
              <p className="text-3xl">{habit.name}</p>
              <p>{habit.description}</p>
            </div>
            <CalendarGrid block={habit} />
            <HabitInsights habit={habit}/>  
          </div> 
          </div>
          
      </div>
  ) : (
      <Redirect to="/home" />
  )
}

export default HabitHome;