
import React from 'react';
import { Col, Container, Row } from 'reactstrap';

function HabitHistory({thisBlock,overall}) {

  return (
      <Col className="m-3 p-5" xs="11" sm="10" md="7" lg="5" xl="4">
        <Row>
            <h3>Your activity on this habit</h3>
        </Row>
        <Row className="habit-history">
            <Col style={{textAlign:"left"}}  className="m-2">
            <ul style={{listStyle:'none'}}>
                <li>Done This Block: {thisBlock}</li>
            </ul>
            </Col>
            
        </Row>
      </Col>
  );
}


export default HabitHistory;