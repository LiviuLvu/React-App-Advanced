import React from 'react';

const Cockpit = (props) => {
  const btnCtrlDisplay = {
    padding: '20px',
    border: 'none',
    backgroundColor: 'green',
    color: '#FFF',
    fontSize: '18px'
  };

  props.state ? btnCtrlDisplay.backgroundColor = 'red' : 'green';

  return(
    <div>
      <h1>React app</h1>
      <button
        style={btnCtrlDisplay}
        onClick={props.click}>
        Display Switch
      </button>
    </div>
  );
};

export default Cockpit;