import React from 'react';

import style from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = (props) =>
  <ul className={style.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuth
      ? <NavigationItem link="/orders">Orders</NavigationItem>
      : null}
    {props.isAuth
      ? <NavigationItem link="/logout">Logout</NavigationItem>
      : <NavigationItem link="/auth">Authenticate</NavigationItem>}
  </ul>;

export default NavigationItems;
