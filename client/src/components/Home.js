import React,{useState} from 'react';
import CalendarGrid from './CalendarGrid';
import { DateTime, Interval } from 'luxon';

function* days(interval) {
  let cursor = interval.start.startOf("day");
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({days: 1});
  }
}

class Day {
  constructor(day,done,active = true) {
    this.day = day;
    this.done = done;
    this.active = active;
  }
}

const currentWindowStart = DateTime.now().startOf('day');
const currentWindowEnd = currentWindowStart.plus({days:29});

let intervalStart =  currentWindowStart.startOf("month");
let intervalEnd = currentWindowEnd.endOf("month");

const firstWeekDay = intervalStart.weekday - 1;
if (firstWeekDay > 0) {
  intervalStart = intervalStart.minus({days:firstWeekDay});
}

const lastWeekDay = intervalEnd.weekday - 1;
if (lastWeekDay < 6) {
  intervalEnd = intervalEnd.plus({days:6-lastWeekDay})
}
const interval = Interval.fromDateTimes(intervalStart,intervalEnd);

let active = [];
let dayIsActive;
for (let day of days(interval)){
  dayIsActive = ( day >= currentWindowStart) && (day <= currentWindowEnd);
  active.push(new Day(day,false,dayIsActive));
}
const Home = (props) => {
  const [activeDays,setActiveDays] = useState(active);
  return (
    <CalendarGrid toggleDone={setActiveDays} activeDays ={[...activeDays]}/>
  );
}

export default Home;