import React,{useState} from 'react';
import { Col } from 'reactstrap';

const Day = ({day,toggleDone}) => {
  const dayNum = day.day.day;
  const done = day.done;
  const active = day.active;
  const [marked,toggleMarked] = useState(done);
  return (
    <Col 
    onClick={() => {if(active) toggleMarked(!marked)}} 
    className={`day ${active? (marked ? "marked":"unmarked" ) : "inactive"}`}>{dayNum}</Col>
  );
};

export default Day;