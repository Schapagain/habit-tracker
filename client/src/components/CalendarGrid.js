
import React from 'react';
import { Col } from 'reactstrap';
import Calendar from './Calendar';

function CalendarGrid({block,toggleDone}) {
  const calendars = block.calendarDays;

  return (
      <Col xs="12" sm="12" md="8" lg="6" xl="5">
          {calendars && calendars.map((calendar,i) => <Calendar key={i} block={block} toggleDone={toggleDone} days={calendar}/>)}
      </Col>
  );
}


export default CalendarGrid;