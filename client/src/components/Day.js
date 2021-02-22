import React,{useState} from 'react';
import { Col } from 'reactstrap';

const Day = ({day}) => {
  const [marked,toggleMarked] = useState(0);
  return (
    <Col onClick={() => toggleMarked(1-marked)} className={`day ${marked? "marked":"unmarked"}`}>{day}</Col>
  );
};

export default Day;