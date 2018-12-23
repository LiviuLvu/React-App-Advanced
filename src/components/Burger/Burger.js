import React from 'react';

import style from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";


const Burger = (props) => {
  // The generated array of ingredients is based on the database object / current state
  const ingredientLayers = Object.keys(props.ingredients)
    .map(igKey => { // ex. cheese, bacon
      return [...Array( props.ingredients[igKey] )].map((_, i) => { // quantity for that ingredient
        return <BurgerIngredient key={igKey + i} type={igKey} />
        });
  });

  const  checkIfIngredients = ingredientLayers.reduce((total, value)=> {
    return total + value.length;
  }, 0);

  const placeholderMessage = (checkIfIngredients === 0) ? <p>Please start adding ingredients</p> : null;

  return (
    <div className={style.Burger}>
      <BurgerIngredient type={"bread-top"}/>
      { ingredientLayers }
      { placeholderMessage }
      <BurgerIngredient type={"bread-bottom"}/>
    </div>
  );
};

export default Burger;
