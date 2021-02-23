import React from 'react';
import { Row, Col } from 'reactstrap';
import Day from './Day';

const Calendar = ({begin,activeDays,end,toggleDone}) => {

  const days = activeDays.slice(begin,end+1);
  const weeks = [0,1,2,3,4];
  const nameOfDays = ["Mon","Tues","Wed","Thu","Fri","Sat","Sun"];
  return (
    <Col className="Calendar m-5" xs={12} sm={12} md={12} lg={6}>
        <Row>
            {nameOfDays.map(name => <Col key={name}>{name}</Col>)}
        </Row>
      {
          
          weeks.map(week =><Row key={week}>
          {days.slice(week*7,week*7 + 7).map(day => <Day toggleDone={toggleDone} key={day.day.toString()} day={day}/>)}</Row>)
      }
    </Col>
  );
}

export default Calendar;