import { useState } from 'react';

function IngredientList({editRecipe, handleDeleteIngredient, handleTitleChange}){

    const [ingredientValues, setIngredientValues] = useState(editRecipe.ingredients);


    return (
        <>
            {editRecipe.ingredients.length ? editRecipe.ingredients.map((ingredient, index) => {
                return (
                <li className="recipe-ingredient" key={ingredient.id}>
                    <input type="text" className="recipe-ingredient-input" onChange={(e) => {
                        const newIngredientValues = [...ingredientValues];
                        newIngredientValues[index].title = e.target.value;
                        setIngredientValues(newIngredientValues);
                        handleTitleChange(ingredient.id, e.target.value)
                    }} value={ingredientValues[index].title}/>
                    <button onClick={() => handleDeleteIngredient(ingredient.id)}  className="recipe-ingredient-delete-button">🗑</button>
                </li>
                )
            }) : null}
            </>
    )
}

export default IngredientList