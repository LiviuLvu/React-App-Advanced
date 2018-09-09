import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4
  };

addIngredientHandler = (type) => {
  const addCountForIngredient = {
    ...this.state.ingredients
  };
  addCountForIngredient[type] = this.state.ingredients[type] + 1;

  this.setState({
    ingredients: addCountForIngredient,
    totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
  });
};

  subtractIngredientHandler = (type) => {
    const addCountForIngredient = { ...this.state.ingredients };

    if (addCountForIngredient[type] <= 0) {
      return;
    }

    addCountForIngredient[type] = this.state.ingredients[type] - 1;

    this.setState({
      ingredients: addCountForIngredient,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    });
  };

  render () {
    const buttonDisable = { ...this.state.ingredients };
    for (let key in buttonDisable) {
      buttonDisable[key] = buttonDisable[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls
          btnState={ buttonDisable }
          addIngredient={this.addIngredientHandler}
          subtractIngredient={this.subtractIngredientHandler } />
      </Aux>
    );
  }
}

export default BurgerBuilder;