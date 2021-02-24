import React,{useState} from 'react';
import CalendarGrid from './CalendarGrid';
import HabitBlock from '../classes/HabitBlock';
import { Container, Row } from 'reactstrap';
import HabitHistory from './HabitHistory';
import HabitHome from './HabitHome';


const italianHabit = new HabitBlock("Italian","10 minutes a day");
const exerciseHabit = new HabitBlock("Exercise","half and hour a day");
const habits = [italianHabit,exerciseHabit]

const AppHome = (props) => {
  const [block,setBlock] = useState(exerciseHabit);

  return (
    <HabitHome habit={block} toggleDone={setBlock} />
  );
}

export default AppHome;