import React from 'react';
import { Row, Col } from 'reactstrap';
import Day from './Day';

const Calendar = (props) => {
    const days = new Array(35).fill(0).map((d,i) => i + 1);
    const weeks = [0,1,2,3,4];
    const nameOfDays = ["Mon","Tues","Wed","Thu","Fri","Sat","Sun"];
  return (
    <Col className="Calendar m-5" xs={12} sm={12} md={12} lg={6}>
        <Row>
            {nameOfDays.map(name => <Col>{name}</Col>)}
        </Row>
      {
          
          weeks.map(week =><Row>
          {days.slice(week*7,week*7 + 7).map(day => <Day day={day}/>)}</Row>)
      }
    </Col>
  );
}

export default Calendar;