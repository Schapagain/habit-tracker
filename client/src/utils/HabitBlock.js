
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

  constructor(name,description,startDate) {
    this._name = name;
    this._description = description;
    this._startDate =  (startDate && DateTime.fromISO(startDate).startOf("day")) || DateTime.now().minus({days:5}).startOf('day');
    // -1 since we include the startDate
    this._endDate = this._startDate.plus({days:HabitBlock.#NUM_DAYS_IN_BLOCK}); 
    this._activeDays = this._makeActiveDays();
    this._calendarDays = this._makeCalendarDays();
    this._doneDays = 0;
  }

  get description() {
    return this._description;
  }

  get name() {
    return this._name;
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
    const dur = Math.round(date.diff(this._startDate).as('days'));
    return dur;
  }

  toggleDay(date) {
    const arrayIndex = this._getDayNumber(date);
    let prevState = this._activeDays[arrayIndex].done;
    this._activeDays[arrayIndex].done = !prevState;
    prevState ? this._doneDays-- : this._doneDays++;
    return this;
  }

  _makeActiveDays() {
    const interval = Interval.fromDateTimes(this._startDate,this._endDate);
    const activeDays = [];
    this._numActiveFirstMonth = HabitBlock.#NUM_DAYS_IN_BLOCK;
    for (let date of dateGenerator(interval)) {
      const day = new Day(date,false);
      activeDays.push(day);
      if (activeDays.length && activeDays[0].date.month !== date.month) this._numActiveFirstMonth--;
    }
    return activeDays;
  }

  _getOverlappedDays() {

    let usingTwoMonths = this._numActiveFirstMonth < HabitBlock.#NUM_DAYS_IN_BLOCK;
    if (!usingTwoMonths) return [];

    // These will create overlaps in two calendars
    let startMonthEnd = this._startDate.endOf("month");
    let endMonthStart = this._endDate.startOf("month");

    // Find the number of missing days from each calendar
    let numMissingFirstMonth = 7 - startMonthEnd.weekday;
    let numMissingSecondMonth = startMonthEnd.weekday % 7;

    // Find all the overlapped days and insert them as inactive days in the middle of two calendars
    let afterFirstMonthEnd = Interval.after(endMonthStart,{days:numMissingFirstMonth});
    let beforeSecondMonthStart = Interval.before(endMonthStart,{days:numMissingSecondMonth});

    let overlaps = [];
    overlaps.push(...this._getDaysFromInterval(afterFirstMonthEnd));
    overlaps.push(...this._getDaysFromInterval(beforeSecondMonthStart));
    return {overlaps,offset:numMissingFirstMonth};
  }

  _getDaysFromInterval(interval,isActive=false) {
    let days = [];
    for (let date of dateGenerator(interval)) {
      const day = new Day(date,false,isActive);
      days.push(day);
    }
    return days;
  }

  _getSurroundingDays() {
    let startMonthStart =  this._startDate.startOf("month");
    let endMonthEnd = this._endDate.endOf("month");

    // adjust for months not starting on monday, or not ending on sunday
    endMonthEnd = endMonthEnd.plus({days:7-endMonthEnd.weekday});
    startMonthStart = startMonthStart.minus({days: startMonthStart.weekday - 1}); 

    // Find all days before the startDate and after the endDate 
    // and insert them around the activedays as dummies
    let beforeStartDate = Interval.fromDateTimes(startMonthStart,this._startDate);
    let afterEndDate = Interval.fromDateTimes(this._endDate,endMonthEnd);
    let before = this._getDaysFromInterval(beforeStartDate);
    let after = this._getDaysFromInterval(afterEndDate);
    return {before,after};
  }

  _makeCalendarDays() {

    let firstMonthEndIndex = this._numActiveFirstMonth;
    let usingTwoMonths = firstMonthEndIndex < HabitBlock.#NUM_DAYS_IN_BLOCK;
    let activeDays = [...this._activeDays];

    // Insert any days that overlap between two months
    // Offset firstmonth end by the number of dummy days inserted
    if (usingTwoMonths) {
      const {overlaps,offset} = this._getOverlappedDays();
      activeDays.splice(firstMonthEndIndex,0,...overlaps);  
      firstMonthEndIndex += offset;
    }
    
    // Get the days before the startDate and after the endDate 
    // that should display on the calendar as inactive days
    const {before,after} = this._getSurroundingDays();

    // return one or two calenders as needed for the block
    let calendars = [];
    if (!usingTwoMonths) {
      calendars.push([...before,...activeDays,...after])
    } else {
      calendars.push([...before,...activeDays.slice(0,firstMonthEndIndex)])
      calendars.push([...activeDays.slice(firstMonthEndIndex),...after]);
    }
    return calendars;
  }
}

export default HabitBlock;