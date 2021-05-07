import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import Button from "./Button";
import { FaCalendarPlus } from "react-icons/fa";
import Block from "./Block";

const Habit = ({ habit }) => {
  const history = useHistory();
  const currentBlock = habit?.blocks[habit.currentBlock];

  return (
    <Block
      title={habit.name}
      description={habit.description}
      hoverDescription={
        !currentBlock && "You don't have any active blocks for this habit"
      }
      block={currentBlock}
      footer={`${currentBlock?.startDate.toFormat("dd MMMM")} - 
        ${currentBlock?.endDate.toFormat("dd MMMM")}`}
      onClick={() => history.push("habit/" + habit.id)}
      active={currentBlock != null}
    />
  );
};

const EmptyHabits = () => {
  return (
    <div className="text-xl">
      <p> Looks like you're not tracking any habits.</p>
      <p>Add a habit to get started.</p>
    </div>
  );
};

const HabitList = () => {
  const history = useHistory();
  const { habits } = useContext(GlobalContext);
  return (
    <div className="flex w-full lg:w-1/2 justify-center p-3 flex-col mx-auto">
      <div className="flex w-full flex-wrap mx-auto justify-center">
        {habits && habits.length ? (
          habits.map((habit) => <Habit key={habit.id} habit={habit} />)
        ) : (
          <EmptyHabits />
        )}
      </div>
      <div className="m-auto">
        <Button
          text="Add a habit"
          icon={<FaCalendarPlus />}
          onClick={() => history.push("/addhabit")}
        />
      </div>
    </div>
  );
};

export default HabitList;
