import React from 'react';
import { NavLink } from 'react-router-dom';

import style from './NavigationItem.css';

const NavigationItem = (props) =>
    <li className={style.NavigationItem}>
      <NavLink
        to={props.link}
        activeClassName={style.active}
        exact
      >
        {props.children}
      </NavLink>
    </li>;

export default NavigationItem;
