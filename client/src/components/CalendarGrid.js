
import React from 'react';
import { Container, Row } from 'reactstrap';
import Calendar from './Calendar';
function CalendarGrid() {
  return (
      <Container>
          <Row className="justify-content-center">
            <Calendar/> 
            <Calendar/>
          </Row>
      </Container>
     
  );
}


export default CalendarGrid;