import React from 'react';
import CalendarGrid from './CalendarGrid';
import { Container, Row, Col } from 'reactstrap';
import HabitHistory from './HabitHistory';



const HabitHome = ({habit, toggleDone}) => {
  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center flex-column">
        <Col className="habit-heading mb-3 p-2" xs="11" sm="11" md="8" lg="11" xl="9">
          <h1>{habit.name}</h1>
          <h6>{habit.description}</h6>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <CalendarGrid toggleDone={toggleDone} block={habit}/>
        <HabitHistory thisBlock={habit.doneDays} overall={habit.doneDaysOverall}/>
      </Row>
    </Container>
  );
}

export default HabitHome;