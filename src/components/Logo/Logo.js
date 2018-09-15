import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import style from './Logo.css';

const Logo = (props) =>
      <div
        className={style.Logo}
        style={{height: props.height}}
      >
        <img src={burgerLogo} alt="Burger Logo"/>
      </div>;

export default Logo;