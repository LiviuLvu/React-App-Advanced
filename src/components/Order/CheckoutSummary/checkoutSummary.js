import React from 'react';

import style from './checkoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from "../../UI/Button/Button";

const checkoutSummary = (props) => {
  return(
      <div className={style.CheckoutSummary}>
        <h1>Enjoy your burger! Bon apetit!</h1>
        <div className={style.ContainerDiv}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button buttonType={"Danger"} clicked>CANCEL</Button>
        <Button buttonType={"Success"} clicked>CONTINUE</Button>
      </div>
  );
};

export default checkoutSummary;
