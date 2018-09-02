import React from 'react';

import style from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const Burger = (props) => {
  // Generate ingredients dynamically
  // The generated array of ingredients is based on the database object / current state
  const ingredientLayers = Object.keys(props.ingredients).map(igKey => { // ex. cheese, bacon
    return [...Array( props.ingredients[igKey] )].map((_, i) => { // number of layers for that ingredient
      return <BurgerIngredient key={igKey + 1} type={igKey} />
      });
  });

  return (
    <div className={style.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      { ingredientLayers }
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default Burger;