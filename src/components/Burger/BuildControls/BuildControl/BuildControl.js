import React from 'react';

import style from './BuildControl.css';

const BuildControl = () => {
  return(
    <div className={style.BuildControl}>
      <div className={style.Label}>{props.label}</div>
      <button className={style.Less}>Less</button>
      <button className={style.More>More</button>
    </div>
  );
};

export default BuildControl;