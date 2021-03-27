import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import Button from "./Button";
import { FaCalendarPlus } from "react-icons/fa";

const startToEndCorner = {
  br: "tr",
  tr: "tl",
  tl: "bl",
  bl: "br",
};

const sideToClass = {
  b: "bottom-0",
  t: "top-0",
  r: "right-0",
  l: "left-0",
};

const ProgressBar = ({ startCorner, donePercentage, color = "green-500" }) => (
  <div
    style={{
      height:
        startCorner === "tl" || startCorner === "br" ? donePercentage : "5px",
      width:
        startCorner === "tr" || startCorner === "bl" ? donePercentage : "5px",
    }}
    className={`absolute z-30 bg-${color} ${sideToClass[startCorner[0]]} ${
      sideToClass[startCorner[1]]
    } rounded-${startCorner}-lg ${
      donePercentage === 100
        ? `rounded-${startToEndCorner[startCorner]}-lg`
        : ""
    } `}
  ></div>
);

const Habit = ({ habit }) => {
  const history = useHistory();
  const mainClass =
    "hover:bg-gray-700 relative w-1/3 min-w-32 p-2 md:w-1/4 m-2 hover:text-white cursor-pointer flex flex-col justify-between rounded-lg bg-gray-300";
  const routeToHabit = () => {
    history.push({
      pathname: "/habit",
      state: { habit },
    });
  };

  return (
    <div
      onClick={() => {
        routeToHabit();
      }}
      className={mainClass}
    >
      <div className="z-40">
        <h1>{habit.name}</h1>
        <h2 className="mb-2">{habit.description}</h2>
        <h3>{habit.donePercentage}</h3>
        <h3>{habit.doneDays}</h3>
      </div>
      <p className="text-gray-500 z-40">
        {habit.startDate.toFormat("dd MMMM")} -{" "}
        {habit.endDate.toFormat("dd MMMM")}
      </p>
      {habit.donePercentage > 15 &&
        Object.keys(startToEndCorner).map((corner) => (
          <ProgressBar
            donePercentage={habit.donePercentage}
            startCorner={corner}
          />
        ))}
    </div>
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
          habits.map((habit) => <Habit key={habit.name} habit={habit} />)
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
