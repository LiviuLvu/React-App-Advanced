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
        <p>Total price is <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control =>
          <BuildControl
            disabled={props.btnState[control.type]}
            addIng={() => props.addIngredient(control.type)}
            subtractIng={() => props.subtractIngredient(control.type)}
            key={control.type}
            label={control.label} />
        )}
      </div>
    );
};

export default BuildControls;