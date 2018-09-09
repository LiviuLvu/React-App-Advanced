import React from 'react';

import style from './BuildControl.css';

const BuildControl = (props) => {
  return(
    <div className={style.BuildControl}>
      <div className={style.Label}>{ props.label }</div>
      <button
        disabled={props.disabled}
        className={style.Less}
        onClick={props.subtractIng}>Less</button>
      <button
        className={style.More}
        onClick={props.addIng}>More</button>
    </div>
  );
};

export default BuildControl;
