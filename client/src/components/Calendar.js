import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import Day from './Day';

const Calendar = ({days,block,toggleDone}) => {

  const weeks = [0,1,2,3,4];
  const nameOfDays = ["Mon","Tues","Wed","Thu","Fri","Sat","Sun"];

  return (
    <Container className="calendar mb-5">
      <Row className="center">
        <h1>{days[7].date.monthShort}</h1>
      </Row>
      <Row className="mb-1">
          {nameOfDays.map(name => <Col key={name}>{name}</Col>)}
      </Row>
      {
          weeks.map(week =>
          <Row key={week}>
            {days.slice(week*7,week*7 + 7).map(day => 
            <Day block={block} toggleDone={toggleDone} key={day.date.toString()} day={day}/>)}
          </Row>)
      }
    </Container>
  );
}

export default Calendar;