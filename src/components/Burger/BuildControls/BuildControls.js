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
            addIng={() => props.addIngredient(control.type)}
            subtractIng={() => props.subtractIngredient(control.type)}
            key={control.type}
            label={control.label} />
        )}
      </div>
    );
};

export default BuildControls;