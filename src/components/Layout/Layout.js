import React from 'react';

import Aux from '../../hoc/Auxiliary';
import style from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout = (props) => (
  <Aux>
    <Toolbar/>
    <main className={style.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;
