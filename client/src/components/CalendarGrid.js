
import React from 'react';
import { Container } from 'reactstrap';
import Calendar from './Calendar';

function CalendarGrid({block,toggleDone}) {
  const calendars = block.calendarDays;

  return (
      <Container>
          {calendars && calendars.map((calendar,i) => <Calendar key={i} block={block} toggleDone={toggleDone} days={calendar}/>)}
      </Container>
  );
}


export default CalendarGrid;