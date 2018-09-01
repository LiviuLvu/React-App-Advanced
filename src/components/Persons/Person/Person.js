import React from 'react';

const person = (props) => {
  return (
    <div>
      <p onClick={props.click}>
        Im {props.name} and am {props.age} centuries old.
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

export default person;