import { DateTime } from 'luxon';
import React from 'react';
import classNames from 'classnames';

const Day = ({day,block,toggleDone,isDayName}) => {

  let dayNum,done,active,inFuture,dayName;

  if (!isDayName) {
    dayNum = day.date.day;
    done = day.done;
    active = day.active;
    inFuture = DateTime.now() < day.date;
  } else {
    dayName = day;
  }

  const mainClass = classNames('w-7 h-7 flex justify-center flex-col m-auto',{
    'cursor-pointer' : !isDayName && active,
    'cursor-not-allowed' : !isDayName && inFuture,
    'hover:bg-gray-700' : !isDayName && !inFuture,
    'text-gray-600' : !isDayName && !active,
  })

  return (
    <div 
    onClick={() => {

      if (active && !inFuture) {
        block.toggleDay(day.date);
        let clone = Object.assign(Object.create(Object.getPrototypeOf(block)), block)
        toggleDone(clone);
      }

    }} 
    className={mainClass}
      >
      {dayNum || dayName}
      {dayNum && done && active && <div className="w-7 h-7 m-auto absolute text-2xl">X</div>}
    </div>
  );
};

export default Day;