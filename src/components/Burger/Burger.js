import React from 'react';

import style from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const Burger = (props) => {
  return (
    <div className={style.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      <BurgerIngredient type={"cheese"}/>
      <BurgerIngredient type={"meat"}/>
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default Burger;