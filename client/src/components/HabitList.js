// import React,{useState} from 'react';
import classNames from 'classnames';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddHabitForm from './AddHabitForm';

const habitClass = 
'hover:bg-gray-700 hover:text-white cursor-pointer w-full flex flex-col rounded-lg p-2 bg-gray-300 my-2';

const Habit = ({index, currentHabit, habit, displayHabit}) => {

    const mainClass = classNames({
        'text-white bg-gray-700':currentHabit === index
    },habitClass)
    return (
        <div onClick={()=>displayHabit(index)} className={mainClass}>
            <h1>{habit.name}</h1>
            <h2 className="mb-2">{habit.description}</h2>
            <p>Current block:</p>
            <p>{habit.startDate.toFormat('DD')} - {habit.endDate.toFormat('DD')}</p>
        </div>
    )
}

// const NewHabit = ({toggleForm}) => {

//     return (
//         <div onClick={()=>toggleForm()} className={habitClass}>
//             <p><FontAwesomeIcon icon={['fas','calendar-plus']} className="mr-2"/>New habit</p>
//         </div>
//     )

// }

const HabitList = ({habits, addNewHabit, currentHabit, displayHabit}) => {

    // const [showNewHabitForm,setShow] = useState(false);

    // const toggleForm = () => {
    //     setShow(!showNewHabitForm);
    // }

  return (
        <div className="flex flex-wrap md:w-1/2 w-2/3 md:absolute mx-auto top-0 right-0 p-4 md:flex-col">
            {habits.map((habit,index) => 
            <Habit 
            currentHabit={currentHabit} 
            index={index} 
            key={habit.name} 
            displayHabit={displayHabit} 
            habit={habit}/>)}
            {/* <NewHabit toggleForm={toggleForm}/> */}
            {/* {showNewHabitForm && <AddHabitForm toggleForm={toggleForm} addHabit={addNewHabit}/>} */}
            <AddHabitForm addHabit={addNewHabit} />
        </div>
  )
}

export default HabitList;