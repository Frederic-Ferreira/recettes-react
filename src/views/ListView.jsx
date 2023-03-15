import RecipeForm from "../components/RecipeForm"
import RecipeList from "../components/RecipeList";
import uniqid from 'uniqid';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import RecipeView from "./RecipeView";

function ListView(){
    const [recipes, setRecipes] = useState([])
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

    return(
        <div>
            {!editMode && <RecipeForm handleFormSubmit={handleCreateRecipe} />}
            {!editMode && <RecipeList recipes={recipes} handleDelete={handleDeleteRecipe} handleEdit={handleEditeRecipe} />}
            {editMode && <RecipeView recipe={editRecipe} handleSaveRecipe={handleSaveRecipe} />}
        </div>
    )
}

export default ListView