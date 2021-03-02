
import React from 'react';
import Calendar from './Calendar';

function CalendarGrid({block}) {
  const calendars = block && block.calendarDays;
  const mainClass = 'md:absolute w-2/3 md:w-1/2 mx-auto top-5 left-0 p-2 flex flex-col bg-purple-400 rounded-lg'
    return (
      <div className={mainClass}>
    {calendars && calendars.map((calendar,i) => <Calendar key={i} block={block} days={calendar}/>)}
    </div>  
    );
}


export default CalendarGrid;