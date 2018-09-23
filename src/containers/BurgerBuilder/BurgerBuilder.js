import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';


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
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false
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

    this.togglePurchaseAbility(addCountForIngredient);
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

    this.togglePurchaseAbility(addCountForIngredient);
  };

  togglePurchaseAbility = (newerState) => {
    const isPurchasable = Object
      .keys(newerState)
      .map(ingredient => newerState[ingredient])
      .reduce((sum, addValue) => sum + addValue, 0);

    this.setState({
      isPurchasable: isPurchasable > 0
    });
  };

  purchaseToggleHandler = () => {
    this.setState(prevState => {
      return {purchasing: !prevState.purchasing}
    })
  };

  purchaseContinueHandler = () => {
    // alert("Proceeding to checkout...");
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Johann Strauss',
        address: {
          street: 'Fsff 1',
          zipCode: '23422',
          country: 'Narnia'
        },
        email: 'asf@wef.com'
      },
      deliveryMethod: 'fastest'
    };
    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render () {
    const buttonDisable = { ...this.state.ingredients };
    for (let key in buttonDisable) {
      buttonDisable[key] = buttonDisable[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseToggleHandler}
        >
          <OrderSummary
            price={this.state.totalPrice}
            purchaseCancel={this.purchaseToggleHandler}
            purchaseContinue={this.purchaseContinueHandler}
            ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls
          ordered={this.purchaseToggleHandler}
          isPurchasable={this.state.isPurchasable}
          price={this.state.totalPrice}
          btnState={ buttonDisable }
          addIngredient={this.addIngredientHandler}
          subtractIngredient={this.subtractIngredientHandler } />
      </Aux>
    );
  }
}

export default BurgerBuilder;