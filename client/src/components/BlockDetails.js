import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import HabitBlock from "../utils/HabitBlock";
import CalendarGrid from "./CalendarGrid";
import NavBar from "./NavBar";
import BackButton from "./BackButton";
import { GlobalContext } from "../context/GlobalState";

export default function BlockDetails({ match }) {
  const { getHabitDetails } = useContext(GlobalContext);
  const habit = getHabitDetails(match.params.habitId);
  const block = habit.blocks?.find(
    (block) => block.id === match.params.blockId
  );
  const blockIsActive =
    habit.currentBlock > -1 && habit.blocks[habit.currentBlock]?.id == block.id;
  return block && block instanceof HabitBlock ? (
    <div className="flex min-h-screen flex-col w-full">
      <NavBar />
      <div className="flex m-auto">
        <BackButton className="my-auto hover:-translate-x-1" />
        <div className="m-auto flex flex-col w-2/3 justify-center">
          <div className="p-4 w-full">
            <p className="text-3xl">{habit.name}</p>
            <p className="truncate max-w-1/3">{habit.description}</p>
          </div>
          <CalendarGrid block={block} active={blockIsActive} />
        </div>
      </div>
    </div>
  ) : (
    <Redirect to="/home" />
  );
}
