import { useState } from "react";

function IngredientList({
  editRecipe,
  handleDeleteIngredient,
  handleTitleChange,
}) {
  const [ingredientValues, setIngredientValues] = useState(
    editRecipe.ingredients
  );

  const handleInputChange = (id, value) => {
    // Copie de la liste des ingrédients
    const updatedIngredients = [...ingredientValues];
    // Trouver l'index de l'élément qui doit être modifié
    const index = updatedIngredients.findIndex(
      (ingredient) => ingredient.id === id
    );
    // Changer le titre dans l'ingredient voulu
    updatedIngredients[index] = { ...updatedIngredients[index], title: value };
    // Nouveaux ingredients avec le titre changé dans le state
    setIngredientValues(updatedIngredients);
    // Changer le titre de l'edit recipe dans le state
    handleTitleChange(id, value);
  };

  const handleDeleteClick = (id) => {
    // Pareil que pour le changement de titre
    const updatedIngredients = [...ingredientValues];
    const index = updatedIngredients.findIndex(
      (ingredient) => ingredient.id === id
    );
    updatedIngredients.splice(index, 1);
    setIngredientValues(updatedIngredients);
    handleDeleteIngredient(id);
  };

  return (
    <>
      {editRecipe.ingredients.length
        ? editRecipe.ingredients.map((ingredient, index) => {
            return (
              <li className="recipe-ingredient" key={ingredient.id}>
                <input
                  type="text"
                  className="recipe-ingredient-input"
                  onChange={(e) =>
                    handleInputChange(ingredient.id, e.target.value)
                  }
                  value={ingredient.title}
                />
                <button
                  onClick={() => handleDeleteClick(ingredient.id)}
                  className="recipe-ingredient-delete-button"
                >
                  🗑
                </button>
              </li>
            );
          })
        : null}
    </>
  );
}

export default IngredientList;
