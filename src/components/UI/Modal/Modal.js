import React from 'react';

import style from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props) =>
  <Aux>
    <Backdrop
      show={props.show}
      clicked={props.modalClose}/>
    <div
      className={style.Modal}
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>;
export default Modal;