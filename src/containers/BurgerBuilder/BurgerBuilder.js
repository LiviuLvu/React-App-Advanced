import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount () {
    this.props.onInitIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, addValue) => sum + addValue, 0);
    return sum > 0;
  };

  purchaseToggleHandler = () => {
    this.setState(prevState => {
      return {purchasing: !prevState.purchasing}
    })
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render () {
    const buttonDisable = { ...this.props.ings };
    for (let key in buttonDisable) {
      buttonDisable[key] = buttonDisable[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ings } />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            subtractIngredient={this.props.onIngredientRemoved}
            btnState={ buttonDisable }
            isPurchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseToggleHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price}
        purchaseCancel={this.purchaseToggleHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseToggleHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
};

 const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
