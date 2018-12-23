import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/checkoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  state={
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    price: 0
  };

  componentWillMount() {
    // ['salad','1']
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;

    for (let param of query.entries()) {
      if(param[0]==='price'){
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('./checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) =>
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice} {...props}/>
          }
        />
      </div>
    );
  }
}

export default Checkout;