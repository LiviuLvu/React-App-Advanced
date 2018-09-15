import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import style from './Logo.css';

const Logo = () =>
      <div className={style.Logo}>
        <img src={burgerLogo} alt="Burger Logo"/>
      </div>;

export default Logo;