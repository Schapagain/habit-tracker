import React,{useState,useEffect} from 'react';
import Day from './Day';

const Calendar = ({days,block}) => {

  const weeks = [0,1,2,3,4];
  const nameOfDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const [calendar,setCalendar] = useState(block);

  useEffect(()=>{
    let isMounted = true;
    if (isMounted) setCalendar(block);
    return () => {isMounted=false};
  },[setCalendar,block]);

  return (
    <div className="w-50 flex flex-col bg-purple-400">
      <h1 className="p-2 mb-3 bg-purple-300">{days[7].date.monthShort}</h1>
      <div className="mb-1 flex">
          {nameOfDays.map(name => <Day isDayName={true} day={name} key={name}/>)}
      </div>
      {
          weeks.map(week =>
          <div className="flex relative" key={week}>
            {days.slice(week*7,week*7 + 7).map(day => 
            <Day block={calendar} toggleDone={setCalendar} key={day.date.toString()} day={day}/>)}
          </div>)
      }
    </div>
  );
}

export default Calendar;