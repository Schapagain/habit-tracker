
import React from 'react';
import Calendar from './Calendar';

function CalendarGrid({block}) {
  const calendars = block && block.calendarDays;
    return (
        <div className="p-2 mx-auto flex text-white bg-calypso rounded-2xl">
          {calendars && calendars.map((calendar,i) => <Calendar key={i} block={block} days={calendar}/>)}
        </div>
    );
}

export default CalendarGrid;