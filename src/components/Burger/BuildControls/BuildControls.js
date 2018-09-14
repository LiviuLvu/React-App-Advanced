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
            disabled={props.btnState[control.type]}
            addIng={() => props.addIngredient(control.type)}
            subtractIng={() => props.subtractIngredient(control.type)}
            key={control.type}
            label={control.label} />
        )}
        <p>Total price is <strong>{props.price.toFixed(2)}</strong></p>
        <button
          disabled={!props.isPurchasable}
          className={style.OrderButton}
          onClick={props.ordered}
        >Order Now</button>
      </div>
    );
};

export default BuildControls;