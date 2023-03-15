import RecipeForm from "../components/RecipeForm"
import RecipeList from "../components/RecipeList";
import uniqid from 'uniqid';
import { useState } from 'react';

function ListView(){
    const [recipes, setRecipes] = useState([])

    const handleCreateRecipe = (e, title) => {
        e.preventDefault();
        setRecipes([...recipes, {
            id: uniqid(),
            title
        }])
    }

    const handleDeleteRecipe = (id) => {
        setRecipes(recipes.filter(recipe => recipe.id !== id))
    }

    return(
        <div>
            <RecipeForm handleFormSubmit={handleCreateRecipe} />
            <RecipeList recipes={recipes} handleDelete={handleDeleteRecipe} />
        </div>
    )
}

export default ListView