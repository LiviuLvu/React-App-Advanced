import React from 'react';

import Aux from '../../../hoc/Auxiliary'

const OrderSummary = (props) => {
    const orderSummary = Object
      .keys(props.ingredients)
      .map((igkeyName) =>
        <ul
          key={igkeyName}
          style={{textTransform: 'capitalize'}}
        >
          {igkeyName}: {props.ingredients[igkeyName]}
        </ul>
      );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {orderSummary}
        </ul>
      </Aux>
    );
};

export default OrderSummary;