
import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';

function CalendarGrid({block}) {
  const calendars = block && block.calendarDays;
  const mainClass = 'w-2/3 md:w-1/2 mx-auto p-2 flex flex-col bg-purple-400 rounded-lg'
  console.log(calendars);
    return (
      <div className="flex flex-col p-5">
        <p className="text-xl">Your current work on {block.name}</p>
        <p>{block.description}</p>
        <div className={mainClass}>
      {calendars && calendars.map((calendar,i) => <Calendar key={i} block={block} days={calendar}/>)}
      </div>  
      <Link className="bg-gray-200 mx-auto my-4 p-2 rounded-lg hover:text-white hover:bg-gray-700"  to="/home" >Back to habits</Link>
      </div>
    );
}

export default CalendarGrid;