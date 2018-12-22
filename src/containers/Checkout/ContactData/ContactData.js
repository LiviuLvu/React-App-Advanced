import React, {Component} from 'react';

import Button from "../../../components/UI/Button/Button";
import Style from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error)
      });
  };

  render () {
    let form = (
      <form>
        <input className={Style.Input} type="text" name="name" placeholder="Your Name"/>
        <input className={Style.Input} type="text" name="email" placeholder="Your Email"/>
        <input className={Style.Input} type="text" name="street" placeholder="Street"/>
        <input className={Style.Input} type="text" name="postal" placeholder="Postal Code"/>
        <Button
            btnType="Success"
            clicked={this.orderHandler}
        >ORDER</Button>
      </form>
    );
    if (this.state.loading === true) {
      form = <Spinner />
    }
    return (
      <div className={Style.ContactData}>
        <h4>Enter Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
