import React,{useEffect, useRef, useState} from 'react';
import CalendarGrid from './CalendarGrid';
import HabitBlock from '../classes/HabitBlock';

const newHabitBlock = new HabitBlock();
const Home = (props) => {
  const [block,setBlock] = useState(newHabitBlock);

  let numDone = useRef(0);

  useEffect(() => {
    numDone.current = block.doneDays;
    console.log('in effect:',numDone.current)
  });

  return (
    <>
    <h1>{numDone.current}</h1>
    <CalendarGrid toggleDone={setBlock} block={block}/>
    </>
  );
}

export default Home;