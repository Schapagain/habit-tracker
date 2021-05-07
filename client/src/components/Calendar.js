import React, { useState, useEffect } from "react";
import Day from "./Day";

const Calendar = ({ days, block }) => {
  const weeks = [0, 1, 2, 3, 4];
  const nameOfDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="flex mx-2 flex-col">
      <h1 className="p-2 mb-3">{days[7].date.monthShort}</h1>
      <div className="mb-1 flex">
        {nameOfDays.map((name) => (
          <Day isDayName={true} day={name} key={name} />
        ))}
      </div>
      {weeks.map((week) => (
        <div className="flex" key={week}>
          {days.slice(week * 7, week * 7 + 7).map((day, index) => (
            <Day block={block} key={index} day={day} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
