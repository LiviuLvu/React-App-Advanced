import React from 'react';

import Aux from '../../hoc/Auxiliary';
import style from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = (props) => (
  <Aux>
    <Toolbar/>
    <SideDrawer/>
    <main className={style.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;
