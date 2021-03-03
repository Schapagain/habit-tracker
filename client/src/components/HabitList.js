import AddHabitForm from './AddHabitForm';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { useContext, useState} from 'react';

const mainClass = 
'hover:bg-gray-700 hover:text-white cursor-pointer w-1/2 mx-auto flex flex-col rounded-lg p-2 bg-gray-300 my-2';

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

const NewHabitButton = ({toggleForm}) => {

    return (
        <div onClick={()=>toggleForm()} className={mainClass}>
            <p>New habit</p>
        </div>
    )

}

const HabitList = () => {

    const [showNewHabitForm,setShow] = useState(false);

    const toggleForm = () => {
        setShow(!showNewHabitForm);
    }

    const { habits } = useContext(GlobalContext);
    return (
        <div className="flex flex-wrap md:w-1/2 w-2/3 mx-auto p-4 md:flex-col">
            {habits.map(habit => 
            <Habit 
            key={habit.name} 
            habit={habit}/>)}
            <NewHabitButton toggleForm={toggleForm}/> 
            {showNewHabitForm && <AddHabitForm toggleForm={toggleForm} />}
        </div>
    )
}

export default HabitList;