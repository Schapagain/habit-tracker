import React,{useState} from 'react';
import CalendarGrid from './CalendarGrid';
import HabitBlock from '../utils/HabitBlock';
// import GoogleLogin from './GoogleLogin';
import HabitList from './HabitList';
import {useTransition,animated} from 'react-spring';
import Quote from './Quote';

const italianHabit = new HabitBlock("Italian","10 minutes a day");
const exerciseHabit = new HabitBlock("Exercise","half and hour a day");
const initialHabits = [italianHabit,exerciseHabit]

const AppHome = (props) => {
  const [habits,setHabits] = useState(initialHabits);
  const [block,setBlock] = useState(0);
  const transitions = useTransition([block],null, {
    from: { o: 0, top:'-10%', right:'-10%'},
    enter: { o: 1, top:'5%', right:'5%'},
    leave: { o: 2, top: '-10%', right:'-10%'},
    config: {duration : 1000}
  });
  const mainClass = "flex flex-col min-h-screen w-full bg-indigo-600"
  
  const addHabit = habit => {
    const newHabit = new HabitBlock(habit.name,habit.description,habit.startDate);
    setHabits(habits => [...habits,newHabit])
  }

  return (
    <div className={mainClass}>
      <div>
        <h1 className="text-4xl p-3 m-2">Hello there.<br/> Here's the quote of the day.</h1>
        <Quote />
      </div>
      <div className="relative mb-5 m-auto w-full sm:w-2/3 lg:w-1/2 h-full">
        <HabitList
        addNewHabit={addHabit}
        currentHabit={block} 
        habits={habits} 
        displayHabit={(block) => setBlock(block)} />
        {/* <CalendarGrid displayHabit={setBlock} block={habits[block]} /> */}
          {transitions.map(({ item, key, props }) =>
            <animated.div key={key} style={{
              opacity: props.o.interpolate([0, 0.5, 1, 1.5, 2], [0, 0, 1, 0, 0])
            }}>
              <CalendarGrid displayHabit={setBlock} block={habits[item]} />
              </animated.div>
            )}
        </div> 
      </div>
      
    
    // <GoogleLogin/>
    // <HabitHome habit={block} toggleDone={setBlock} />
  );
}

export default AppHome;