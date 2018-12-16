import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from "../../components/Burger/Burger";
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
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
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice.toFixed(2),
    //   customer: {
    //     name: 'Johann Strauss',
    //     address: {
    //       street: 'Fsff 1',
    //       zipCode: '23422',
    //       country: 'Narnia'
    //     },
    //     email: 'asf@wef.com'
    //   },
    //   deliveryMethod: 'fastest'
    // };
    // axios.post('/orders.json', order)
    //   .then(response => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(response)
    //   })
    //   .catch(error => {
    //     this.setState({ loading: false, purchasing: false });
    //     console.log(error)
    //   });

    const queryParams = [];

    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }

    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  };

  render () {
    const buttonDisable = { ...this.state.ingredients };
    for (let key in buttonDisable) {
      buttonDisable[key] = buttonDisable[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/>;

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={ this.state.ingredients } />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            subtractIngredient={this.subtractIngredientHandler }
            btnState={ buttonDisable }
            isPurchasable={this.state.isPurchasable}
            ordered={this.purchaseToggleHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
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

export default withErrorHandler(BurgerBuilder, axios);
