
import React from 'react';
import { Container, Row } from 'reactstrap';
import Calendar from './Calendar';

function CalendarGrid({activeDays,toggleDone}) {

  const firstDay = activeDays[0].day;
  const lastDay = activeDays[activeDays.length - 1].day;

  const needExtraMonth = firstDay.startOf("month") !== lastDay.startOf("month");

  let nextMonthStart = 0;
  if (needExtraMonth) {
    for (let i = 1; i < activeDays.length; i++) {
      if (activeDays[i].day.month !== activeDays[i-1].day.month) {nextMonthStart = i;break}
    }
  }

  return (
      <Container>
          <Row className="justify-content-center">
            <Calendar 
            begin={0} 
            activeDays = {[...activeDays]}
            end={needExtraMonth? nextMonthStart - 1 : activeDays.length - 1}
            toggleDone={toggleDone}
            /> 
            {needExtraMonth && 
            <Calendar 
            begin={nextMonthStart}
            activeDays = {activeDays}
            end = {activeDays.length - 1}
            toggleDone = {toggleDone}
            />}
          </Row>
      </Container>
     
  );
}


export default CalendarGrid;