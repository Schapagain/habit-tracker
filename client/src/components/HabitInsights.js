import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export default function HabitInsights({ habitId }) {
  const { getHabitDetails } = useContext(GlobalContext);
  const habit = getHabitDetails(habitId);

  const numDoneInBlock = habit?.blocks[habit.currentBlock]?.doneDays;
  const insightClasses =
    "p-3 w-full md:w-1/2 text-white bg-opacity-70 rounded-bl-xl rounded-tr-xl mx-auto my-1 bg-calypso";
  return (
    <div className="p-2 flex flex-col">
      {habit?.blocks.length > 1 && (
        <p className={insightClasses}>
          You have {habit.blocks.length} blocks for this habit
        </p>
      )}
      {numDoneInBlock != null && (
        <p className={insightClasses}>{getNumDoneCommentary(numDoneInBlock)}</p>
      )}
    </div>
  );
}

const getNumDoneCommentary = (numDone) => {
  if (numDone < 5) {
    return "Looks like you're just starting with the current block. Remember, a good start is a job half done.";
  } else if (numDone < 17) {
    return `You're ${numDone} days in. Keep it up!`;
  } else {
    return `With ${numDone} days under your belt, you're well into the block. We're sure you're feeling the habit growing on you.`;
  }
};
