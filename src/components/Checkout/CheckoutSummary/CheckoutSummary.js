import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import style from './CheckoutSummary.css'

const CheckoutSummary = (props) =>
  <div className={style.CheckoutSummary}>
    <h1>Enjoy!</h1>
    <div style={{width: '100%'}}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      btnType="Danger"
      clicked
    >CANCEL</Button>
    <Button
      btnType="Success"
      clicked
    >CANCEL</Button>
  </div>;

export default CheckoutSummary;