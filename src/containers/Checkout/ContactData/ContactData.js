import React, {Component} from 'react';

import Button from "../../../components/UI/Button/Button";
import Style from './ContactData.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  orderHandler = () => {
  };

  render () {
    return (
      <div className={Style.ContactData}>
        <h4>Enter Contact Data</h4>
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
      </div>
    )
  }
}

export default ContactData;
