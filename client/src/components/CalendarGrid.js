import React from "react";
import Calendar from "./Calendar";

function CalendarGrid({ block, active }) {
  const calendars = block && block.calendarDays;
  return (
    <div
      className={`p-2 mx-auto md:flex-row flex flex-col text-white bg-calypso rounded-2xl ${
        !active ? "pointer-events-none" : ""
      }`}
    >
      {calendars &&
        calendars.map((calendar, i) => (
          <Calendar key={i} block={block} days={calendar} />
        ))}
    </div>
  );
}

export default CalendarGrid;
