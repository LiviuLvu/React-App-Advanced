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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    isPurchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount () {
    axios.get('https://react-complete-guide-84b96.firebaseio.com/ingredients.json')
      .then(response => this.setState({ingredients: response.data}))
      .catch(() => this.setState({error: true}));
  }

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
    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render () {
    const buttonDisable = { ...this.props.ings };
    for (let key in buttonDisable) {
      buttonDisable[key] = buttonDisable[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={ this.props.ings } />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            subtractIngredient={this.props.onIngredientRemoved}
            btnState={ buttonDisable }
            isPurchasable={this.state.isPurchasable}
            ordered={this.purchaseToggleHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.state.totalPrice}
        purchaseCancel={this.purchaseToggleHandler}
        purchaseContinue={this.purchaseContinueHandler}
      />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner/>
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
    ings: state.ingredients
  }
};

 const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
