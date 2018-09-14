import React from 'react';

import style from './Backdrop.css';

const Backdrop = (props) => (
  props.show ? <div
    className={style.Backdrop}
    onClick={props.clicked}
  /> : null
);

export default Backdrop;