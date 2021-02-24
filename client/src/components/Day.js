import { DateTime } from 'luxon';
import React from 'react';
import { Col } from 'reactstrap';

const Day = ({day,block,toggleDone}) => {
  const dayNum = day.date.day;
  const done = day.done;
  const active = day.active;
  const inFuture = DateTime.now() < day.date;

  return (
    <Col 
    onClick={() => {

      if (active && !inFuture) {
        block.toggleDay(day.date);
        let clone = Object.assign(Object.create(Object.getPrototypeOf(block)), block)
        toggleDone(clone);
      }

    }} 
    className={`day ${
      active
      ? (
        inFuture 
        ? "active future" 
        : done 
          ? "active marked"
          :"active unmarked" ) 
      : "inactive"}`}
      >
      
      {dayNum}
    </Col>
  );
};

export default Day;