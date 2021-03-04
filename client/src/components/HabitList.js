import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { useContext } from 'react';
import Button from './Button';
import { FaCalendarPlus } from 'react-icons/fa';

const mainClass = 
'hover:bg-gray-700 w-1/3 md:w-1/4 p-2 m-2 hover:text-white cursor-pointer flex flex-col rounded-lg bg-gray-300';

const Habit = ({habit}) => {

    const history = useHistory();

    const routeToHabit = () => {
        history.push({
            pathname:'/habit',
            state: {habit}
        });
    }

    return (
        <div onClick={()=>{routeToHabit();}} className={mainClass}>
            <h1>{habit.name}</h1>
            <h2 className="mb-2">{habit.description}</h2>
            <p>Current block:</p>
            <p>{habit.startDate.toFormat('DD')} - {habit.endDate.toFormat('DD')}</p>
        </div>
    )
}

const EmptyHabits = () => {
    return (
        <div className="text-xl">
            <p> Looks like you're not tracking any habits.</p>
            <p>Add a habit to get started.</p>
            
        </div>
    )
}

const HabitList = () => {
    const history = useHistory();
    const { habits } = useContext(GlobalContext);
    return (
        <div className="flex w-full justify-center p-3 lg:w-1/2 flex-col mx-auto">
            <div className="flex flex-wrap mx-auto justify-center">
                {habits && habits.length 
                ? habits.map(habit => 
                <Habit 
                key={habit.name}  
                habit={habit}/>) 
                : <EmptyHabits />}   
            </div>
            <div className="m-auto">
                <Button 
                text = "Add a habit"
                icon = {<FaCalendarPlus />}
                onClick = {()=>history.push("/addhabit")}
                />
            </div>
        </div>
    )
}

export default HabitList;