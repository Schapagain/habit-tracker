
import { DateTime, Interval } from 'luxon';

function* dateGenerator(interval) {
  let cursor = interval.start.startOf("day");
  while (cursor < interval.end) {
    yield cursor;
    cursor = cursor.plus({days: 1});
  }
}

class Day {
  constructor(date,done,active = true) {
    this.date = date;
    this.done = done;
    this.active = active;
  }
}

class HabitBlock {

  static #NUM_DAYS_IN_BLOCK = 30;

  constructor() {
    this._startDate = DateTime.now().startOf('day');
    // -1 since we include the startDate
    this._endDate = this._startDate.plus({days:HabitBlock.#NUM_DAYS_IN_BLOCK-1}); 
    this._activeDays = this._makeActiveDays();
    this._calendarDays = this._makeCalendarDays();
    this._doneDays = 0;
  }

  get startDate() {
    return this._startDate;
  }

  get endDate() {
    return this._endDate;
  }

  get activeDays() {
    return [...this._activeDays];
  }
 
  get doneDays() {
    return this._doneDays;
  }

  get calendarDays() {
    return this._calendarDays;
  }
  _getDayNumber(date) {
    console.log('diff between:',this._startDate.toString(),date.toString());
    const dur = Math.round(date.diff(this._startDate).as('days'));
    console.log('is:',dur);
    return dur;
  }

  toggleDay(date) {
    console.log('toggling',date.day);
    const arrayIndex = this._getDayNumber(date);
    console.log('daynumberis:',arrayIndex);
    let prevState = this._activeDays[arrayIndex].done;
    console.log('prevstate:',prevState);
    this._activeDays[arrayIndex].done = !prevState;
    console.log('newstate:',this._activeDays[arrayIndex].done);
    prevState ? this._doneDays-- : this._doneDays++;
    return this;
  }

  _makeActiveDays() {
    const interval = Interval.fromDateTimes(this._startDate,this._endDate);
    const activeDays = [];
    this._numActiveFirstMonth = HabitBlock.#NUM_DAYS_IN_BLOCK - 1;
    for (let date of dateGenerator(interval)) {
      const day = new Day(date,false);
      activeDays.push(day);
      if (activeDays.length && activeDays[0].date.month !== date.month) this._numActiveFirstMonth--;
    }
    return activeDays;
  }



  _makeCalendarDays() {
    let startMonthBegin =  this._startDate.startOf("month");
    let endMonthEnd = this._endDate.endOf("month");

    // adjust for months not starting on monday, or not ending on sunday
    endMonthEnd = endMonthEnd.plus({days:7-endMonthEnd.weekday});
    startMonthBegin = startMonthBegin.minus({days: startMonthBegin.weekday - 1});

    let beforeStartDate = Interval.fromDateTimes(startMonthBegin,this._startDate);
    let afterEndDate = Interval.fromDateTimes(this._endDate,endMonthEnd);

    let before = [], after =[];
    for (let date of dateGenerator(beforeStartDate)) {
      const day = new Day(date,false,false);
      before.push(day);
    }

    for (let date of dateGenerator(afterEndDate)) {
      const day = new Day(date,false,false);
      after.push(day);
    }

    // return one or two calenders as needed for the block
    let calendars = [];
    if (this._numActiveFirstMonth === HabitBlock.#NUM_DAYS_IN_BLOCK) {
      calendars.push([...before,...this._activeDays,...after])
    } else {
      calendars.push([...before,...this._activeDays.slice(0,this._numActiveFirstMonth)])
      calendars.push([...this._activeDays.slice(this._numActiveFirstMonth),...after]);
    }
    return calendars;
  }
}

export default HabitBlock;