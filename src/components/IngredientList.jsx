import { useState } from 'react';

function IngredientList({editRecipe, handleDeleteIngredient, handleTitleChange}){

    const [ingredientValues, setIngredientValues] = useState(editRecipe.ingredients);

    const handleInputChange = (id, value) => {
        // Copie de la liste des ingrédients
        const updatedIngredients = [...ingredientValues];
        // Trouver l'index de l'élément qui doit être modifié
        const index = updatedIngredients.findIndex(ingredient => ingredient.id === id);
        // Mettre à jour l'élément dans la liste copiée
        updatedIngredients[index] = {...updatedIngredients[index], title: value};
        // Mettre à jour la liste des ingrédients dans le state
        setIngredientValues(updatedIngredients);
        // Appelez la fonction de rappel pour notifier le changement de titre
        handleTitleChange(id, value);
    };

    const handleDeleteClick = (id) => {
        // Copie de la liste des ingrédients
        const updatedIngredients = [...ingredientValues];
        // Trouver l'index de l'élément qui doit être supprimé
        const index = updatedIngredients.findIndex(ingredient => ingredient.id === id);
        // Supprimer l'élément de la liste copiée
        updatedIngredients.splice(index, 1);
        // Mettre à jour la liste des ingrédients dans le state
        setIngredientValues(updatedIngredients);
        // Appeler la fonction de rappel pour notifier la suppression de l'ingrédient
        handleDeleteIngredient(id);
    };


    return (
        <>
            {editRecipe.ingredients.length ? editRecipe.ingredients.map((ingredient, index) => {
                return (
                <li className="recipe-ingredient" key={ingredient.id}>
                    <input type="text" className="recipe-ingredient-input" onChange={(e) => handleInputChange(ingredient.id, e.target.value)} value={ingredient.title}/>
                    <button onClick={() => handleDeleteClick(ingredient.id)}  className="recipe-ingredient-delete-button">🗑</button>
                </li>
                )
            }) : null}
            </>
    )
}

export default IngredientList