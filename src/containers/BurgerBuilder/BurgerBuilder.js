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
import * as actions from '../../store/actions/index';

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
    if(this.props.isAuth) {
      this.setState({purchasing: true});
    } else {
      this.props.history.push('/auth');
    }
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
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
            isAuth={this.props.isAuth}
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
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null
  }
};

 const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
   }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
