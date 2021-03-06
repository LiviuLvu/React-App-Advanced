import React from 'react';

import style from './Button.css';

const Button = (props) =>
  <button
    disabled={props.disabled}
    className={[style.Button, style[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>;

export default Button;
