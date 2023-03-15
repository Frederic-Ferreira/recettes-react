import uniqid from "uniqid";
import { useState } from "react";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
// import { useNavigate } from "react-router-dom";
import RecipeView from "./RecipeView";
import ShoppingView from "./ShoppingView";

function ListView() {
  const [recipes, setRecipes] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editRecipe, setEditRecipe] = useState(null);

  const [shoppingMode, setShoppingMode] = useState(false);
  // const navigate = useNavigate()

  const handleCreateRecipe = (e, title) => {
    e.preventDefault();
    // Ajouter une recette à celle déjà présente dans le state
    setRecipes([
      ...recipes,
      {
        id: uniqid(),
        title,
        description: "",
        ingredients: [],
      },
    ]);
  };

  const handleDeleteRecipe = (id) => {
    // Filter renvoie une nouvelle array
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEditeRecipe = (id) => {
    /* navigate(`/:${id}`) code vous au début avec react router */

    // Mettre la recette qui va être éditée dans le state et changer de vue
    setEditRecipe(recipes.find((recipe) => recipe.id === id));
    setEditMode(true);
  };

  const handleSaveRecipe = (editedRecipe) => {
    // Changer le state de nos recettes avec les nouvelles données de la recipe view
    setRecipes(
      recipes.map((recipe) =>
        recipe.id === editedRecipe.id ? editedRecipe : recipe
      )
    );
    setEditMode(false);
  };

  const handleAddToShoppingList = (ingredients) => {
    // Ajouter la propriété done aux ingredients pour les utiliser dans la shopping view
    const doneIngredients = ingredients.map((ingredient) => ({
      ...ingredient,
      done: false,
    }));
    setShoppingList([...shoppingList, ...doneIngredients]);
    setEditMode(false);
    setShoppingMode(true);
  };

  const handleCheckOne = (id) => {
    // Changer l'état de done de l'ingredient voulu et changer le state
    const updatedShopList = shoppingList.map((ingredient) => {
      if (ingredient.id === id) {
        return { ...ingredient, done: !ingredient.done };
      }
      return ingredient;
    });
    setShoppingList(updatedShopList);
  };

  const handleCheckAll = () => {
    // Map retourne une nouvelle array
    setShoppingList(
      shoppingList.map((ingredient) => ({
        ...ingredient,
        done: true,
      }))
    );
  };

  const handleClearChecked = () => {
    // Filter retourne une nouvelle array
    setShoppingList(shoppingList.filter((ingredient) => !ingredient.done));
  };

  const handleClearAll = () => {
    setShoppingList([]);
  };

  const handleGoShoppingList = () => {
    setShoppingMode(true);
  };

  const handleGoHome = () => {
    setShoppingMode(false);
  };

  return (
    <div>
      <h1 className="main-title">Recipe Book</h1>
      {!editMode && !shoppingMode && (
        <RecipeForm handleFormSubmit={handleCreateRecipe} />
      )}
      {!editMode && !shoppingMode && (
        <RecipeList
          recipes={recipes}
          handleDelete={handleDeleteRecipe}
          handleEdit={handleEditeRecipe}
        />
      )}
      {editMode && !shoppingMode && (
        <RecipeView
          recipe={editRecipe}
          handleSaveRecipe={handleSaveRecipe}
          handleAddShopping={handleAddToShoppingList}
        />
      )}
      {shoppingMode && !editMode && (
        <ShoppingView
          list={shoppingList}
          handleCheckOne={handleCheckOne}
          handleCheckAll={handleCheckAll}
          handleClearChecked={handleClearChecked}
          handleClearAll={handleClearAll}
        />
      )}
      {!shoppingMode && !editMode && (
        <button onClick={handleGoShoppingList}>Shopping List</button>
      )}
      {shoppingMode && !editMode && (
        <button onClick={handleGoHome}>Home</button>
      )}
    </div>
  );
}

export default ListView;
