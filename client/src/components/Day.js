import { DateTime } from "luxon";
import React, { useContext } from "react";
import classNames from "classnames";
import { GlobalContext } from "../context/GlobalState";

const Day = ({ day, block, isDayName }) => {
  let dayNum, done, active, inFuture, dayName;

  if (!isDayName) {
    dayNum = day.date.day;
    done = day.done;
    active = day.active;
    inFuture = DateTime.now() < day.date;
  } else {
    dayName = day;
  }

  const mainClass = classNames(
    "w-10 h-10 flex justify-center flex-col m-auto",
    {
      "cursor-pointer": !isDayName && active,
      "cursor-not-allowed": !isDayName && inFuture,
      "hover:bg-gray-700": !isDayName && !inFuture,
      "text-gray-400": !isDayName && !active,
    }
  );

  const { updateHabit } = useContext(GlobalContext);

  return (
    <div
      onClick={() => {
        if (active && !inFuture) {
          block.toggleDay(day.date);
          let clone = Object.assign(
            Object.create(Object.getPrototypeOf(block)),
            block
          );
          updateHabit(clone);
        }
      }}
      className={mainClass}
    >
      {dayNum || dayName}
      {dayNum && done && active && (
        <div className="w-10 h-10 m-auto absolute text-3xl">X</div>
      )}
    </div>
  );
};

export default Day;
