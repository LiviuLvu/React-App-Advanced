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
      <Button
          btnType={"Danger"}
          clicked={props.checkoutCanceled}
      >CANCEL</Button>
      <Button
          btnType={"Success"}
          clicked={props.checkoutContinued}
      >CONTINUE</Button>
    </div>
  );
};

export default checkoutSummary;
