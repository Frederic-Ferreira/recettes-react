import RecipeForm from "../components/RecipeForm"
import RecipeList from "../components/RecipeList";
import uniqid from 'uniqid';
import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import RecipeView from "./RecipeView";
import ShoppingView from "./ShoppingView";

function ListView(){
    const [recipes, setRecipes] = useState([])
    const [shoppingList, setShoppingList] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [editRecipe, setEditRecipe] = useState(null)

    const [shoppingMode, setShoppingMode] = useState(false)
    // const navigate = useNavigate()

    const handleCreateRecipe = (e, title) => {
        e.preventDefault();
        setRecipes([...recipes, {
            id: uniqid(),
            title,
            description: '',
            ingredients: []
        }])
    }
 
    const handleDeleteRecipe = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id))
    }

    const handleEditeRecipe = (id) => {
        // navigate(`/:${id}`)
        setEditRecipe(recipes.find(recipe => recipe.id === id))
        setEditMode(true)
    }

    const handleSaveRecipe = (editedRecipe) => {
        setRecipes(recipes.map(recipe => recipe.id === editedRecipe.id ? editedRecipe : recipe))
        setEditMode(false)
    }

    const handleAddToShoppingList = (ingredients) => {
        const doneIngredients = ingredients.map(ingredient => {
            return {
                ...ingredient, 
                done: false
            }
        })
        setShoppingList([...shoppingList, ...doneIngredients])
        setEditMode(false)
        setShoppingMode(true)
    }

    const handleIngredientDone = (id) => {
        const updatedShopList = shoppingList.map(ingredient => {
          if (ingredient.id === id) {
            return { ...ingredient, done: !ingredient.done };
          } else {
            return ingredient
          }
        })
        setShoppingList(updatedShopList)
      };

    const handleCheckAll = () => {
        setShoppingList(shoppingList.map(ingredient => {
            return {
                ...ingredient, 
                done: true
            }
        }))
    }

    const handleClearChecked = () => {
        setShoppingList(shoppingList.filter(ingredient => !ingredient.done))
    }

    const handleClearAll= () => {
        setShoppingList([])
    }

    const handleGoShoppingList = () =>{
        setShoppingMode(true)
    }

    const handleGoHome = () => {
        setShoppingMode(false)
    }

    return(
        <div>
            {!editMode && !shoppingMode && <RecipeForm handleFormSubmit={handleCreateRecipe} />}
            {!editMode && !shoppingMode && <RecipeList recipes={recipes} handleDelete={handleDeleteRecipe} handleEdit={handleEditeRecipe} />}
            {editMode && !shoppingMode && <RecipeView recipe={editRecipe} handleSaveRecipe={handleSaveRecipe} handleAddShopping={handleAddToShoppingList} />}
            {shoppingMode && !editMode && <ShoppingView list={shoppingList} handleCheckOne={handleIngredientDone} handleCheckAll={handleCheckAll} handleClearChecked={handleClearChecked} handleClearAll={handleClearAll} />}
            {!shoppingMode && !editMode && <button onClick={handleGoShoppingList}>Shopping List</button>}
            {shoppingMode && !editMode && <button onClick={handleGoHome}>Home</button>}
        </div>
    )
}

export default ListView