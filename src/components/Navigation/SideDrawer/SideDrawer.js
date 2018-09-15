import React from 'react';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import style from './SideDrawer.css';

const SideDrawer = () => {
  // ...
  return (
    <div className={style.SideDrawer}>
      <Logo
        className={style.Logo}
        height="11%"/>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
};

export default SideDrawer;