import RecipeForm from "../components/RecipeForm"
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

    return(
        <div>
            <RecipeForm handleFormSubmit={handleCreateRecipe} />
            <div className="recipe-book">
                {recipes.length ? (
                    recipes.map(recipe => {
                        return (
                <div className="recipe" key={recipe.id}>
                    <div className="recipe-title">{recipe.title}</div>
                    <div className="recipe-actions">
                    <button className="recipe-edit-button">Edit</button>
                    <button className="recipe-delete-button">Delete</button>
                    </div>
                </div>
                        )
                    })
                ) : null}
            </div>
        </div>
    )
}

export default ListView