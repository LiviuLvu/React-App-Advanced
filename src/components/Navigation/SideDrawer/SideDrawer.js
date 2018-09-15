import React from 'react';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import style from './SideDrawer.css';
import Aux from "../../../hoc/Auxiliary";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let attachedClasses = [style.SideDrawer, style.Close];
  if (props.open) {
    attachedClasses = [style.SideDrawer, style.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        <Logo
          className={style.Logo}
          height="11%"/>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;