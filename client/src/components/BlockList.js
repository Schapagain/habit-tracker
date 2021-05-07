import { Redirect, useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import Button from "./Button";
import { FaCalendarPlus } from "react-icons/fa";
import Block from "./Block";

export default function BlockList({ habitId }) {
  const history = useHistory();
  const { getHabitDetails } = useContext(GlobalContext);
  const habit = getHabitDetails(habitId);
  const isBlockActive = (block) =>
    habit.currentBlock > -1 && habit.blocks[habit.currentBlock]?.id == block.id;
  return habit ? (
    <div className="flex w-full lg:w-1/2 justify-center p-3 flex-col mx-auto">
      <div>
        <p className="truncate">{habit.name}</p>
        <p className="truncate">{habit.description}</p>
      </div>
      <div className="flex w-full flex-wrap mx-auto justify-center">
        {habit &&
          habit.blocks &&
          habit.blocks.map((block) => (
            <Block
              key={block.id}
              active={isBlockActive(block)}
              title={"Block title"}
              hoverDescription={
                !isBlockActive(block) && "This block has expired"
              }
              block={block}
              footer={`${block.startDate.toFormat("dd MMMM")} - 
        ${block.endDate.toFormat("dd MMMM")}`}
              onClick={() =>
                history.push(`/habit/${habitId}/block/${block.id}`)
              }
            />
          ))}
      </div>
      {habit?.currentBlock === -1 && (
        <div className="m-auto">
          <Button
            text="Add a block"
            icon={<FaCalendarPlus />}
            onClick={() => history.push(`/habit/${habitId}/addblock`)}
          />
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/home" />
  );
}
