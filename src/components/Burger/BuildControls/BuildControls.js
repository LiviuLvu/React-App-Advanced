import React from 'react';

import style from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
];

const BuildControls = (props) => {
  return (
    <div className={style.BuildControls}>
      {controls.map(control =>
        <BuildControl
          key={control.type}
          label={control.label}
          addIng={() => props.addIngredient(control.type)}
          subtractIng={() => props.subtractIngredient(control.type)}
          disabled={props.btnState[control.type]}
        />
      )}
      <p>Total price is <strong>{props.price.toFixed(2)}</strong></p>
      <button
        disabled={!props.isPurchasable}
        className={style.OrderButton}
        onClick={props.ordered} >
        {props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}
      </button>
    </div>
  );
};

export default BuildControls;
