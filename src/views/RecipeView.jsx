import { useState } from "react";
import uniqid from "uniqid";
import IngredientList from "../components/IngredientList";

function RecipeView({ recipe, handleSaveRecipe, handleAddShopping }) {
  // Initier les states avec la valeur provenant de l'original recipe
  const [editRecipe, setEditRecipe] = useState(recipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescritpion] = useState(recipe.description);
  const [ingredient, setIngredient] = useState("");

  const handleTitleChange = (value) => {
    setTitle(value);
    // Changer juste la valeur du titre de notre state recipe
    setEditRecipe({
      ...editRecipe,
      title: value,
    });
  };

  const handleDescriptionChange = (value) => {
    setDescritpion(value);
    // Changer juste la valeur de la description de notre state recipe
    setEditRecipe({
      ...editRecipe,
      description: value,
    });
  };

  const handleAddIngredient = (e, title) => {
    e.preventDefault();
    // Ajouter l'ingredient dans la recipe state, et reloader le state de la recipe
    editRecipe.ingredients.push({
      id: uniqid(),
      title,
    });
    setEditRecipe(editRecipe);
  };

  const handleChangeIngredientTitle = (id, value) => {
    // Changer le titre de l'ingredient dans la liste des ingredients
    const newIngredients = editRecipe.ingredients.map((ingredient) => {
      if (ingredient.id === id) {
        return {
          id,
          title: value,
        };
      }
      return ingredient;
    });
    // Assigner nouveaux ingredient à la recipe du state
    setEditRecipe({
      ...editRecipe,
      ingredients: newIngredients,
    });
  };

  const handleDeleteIngredient = (id) => {
    // Créer une copie de la recipe avec les nvx ingredients plutot que de les modifiers dans le state
    const newIngredients = editRecipe.ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    const newRecipe = {
      ...editRecipe,
      ingredients: newIngredients,
    };
    setEditRecipe(newRecipe);
  };

  return (
    <div className="recipe-edit-form">
      <input
        type="text"
        className="recipe-edit-title-input"
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
      <textarea
        rows={10}
        className="recipe-edit-description-input"
        value={description}
        onChange={(e) => handleDescriptionChange(e.target.value)}
      />
      <h2 className="recipe-ingredients-title">Ingredients</h2>
      <ul className="recipe-ingredients-list">
        <IngredientList
          editRecipe={editRecipe}
          handleDeleteIngredient={handleDeleteIngredient}
          handleTitleChange={handleChangeIngredientTitle}
        />
        <form
          className="recipe-new-ingredient"
          onSubmit={(e) => {
            handleAddIngredient(e, ingredient);
            setIngredient("");
          }}
        >
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="recipe-new-ingredient-input"
            placeholder="Add a new ingredient..."
          />
          <button className="recipe-new-ingredient-button">Add</button>
        </form>
      </ul>
      <div className="recipe-edit-actions">
        <button
          onClick={() => handleSaveRecipe(editRecipe)}
          className="recipe-edit-save-button"
        >
          Save
        </button>
        <button
          onClick={() => handleAddShopping(editRecipe.ingredients)}
          className="recipe-edit-cart-button"
        >
          Add to shopping list
        </button>
      </div>
    </div>
  );
}

export default RecipeView;
