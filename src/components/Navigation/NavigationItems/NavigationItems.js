import React from 'react';

import style from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () =>
  <ul className={style.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>;

export default NavigationItems;
