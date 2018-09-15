import React from 'react';

import style from './NavigationItem.css';

const NavigationItem = (props) =>
    <li className={style.NavigationItem}>
      <a
        href={props.link}
        className={props.active ? style.active : null}
      >
        {props.children}
      </a>
    </li>;

export default NavigationItem;