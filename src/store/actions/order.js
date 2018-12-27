import * as actionTypes from './actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
};

export const purchaseBurgerStart = (orderData) => {
  return dispatch => {
    axios.post('/orders.json', order)
      .then(() => {
        dispatch( purchaseBurgerSuccess(resonse.data, orderData) );
      })
      .catch(error => {
        dispatch( purchaseBurgerFail(error) );
      })
  }
};
