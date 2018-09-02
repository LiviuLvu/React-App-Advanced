import React from 'react';

import Aux from '../../hoc/Auxiliary';
import style from './Layout.css';

const Layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={style.Content}>
      {props.children}
    </main>
  </Aux>
);

export default Layout;
