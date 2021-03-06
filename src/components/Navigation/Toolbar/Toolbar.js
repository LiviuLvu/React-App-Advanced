import React from 'react';

import style from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) =>
  <header className={style.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}/>
    <Logo height="80%"/>
    <nav className={style.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>;

export default Toolbar;
