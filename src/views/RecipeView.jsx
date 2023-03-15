import { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import IngredientList from '../components/IngredientList';

function RecipeView({ recipe, handleSaveRecipe, handleAddShopping }){

    const [editRecipe, setEditRecipe] = useState(recipe)
    const [ingredient, setIngredient] = useState('')
    const [title, setTitle] = useState(recipe.title)
    const [description, setDescritpion] = useState(recipe.description)

    const handleAddIngredient = (e, title) => {
        e.preventDefault()
        editRecipe.ingredients.push({
            id: uniqid(),
            title,
        })
        setEditRecipe(editRecipe)
    }

    const handleChangeIngredientTitle = (id, value) => {
        // changer l'ingredient dans la liste des ingredients
        const newIngredients = editRecipe.ingredients.map(ingredient => {
            if(ingredient.id === id) {
                return {
                    id,
                    title: value
                }
            } else return ingredient
        })
        // assigner nouveaux ingredient à l'editRecipe
        setEditRecipe({
            ...editRecipe,
            ingredients: newIngredients
        })
    }

    const handleDeleteIngredient = (id) => {
        const newIngredients = editRecipe.ingredients.filter(ingredient => ingredient.id !== id)
        const newRecipe = {
            ...editRecipe,
            ingredients: newIngredients
          };
        setEditRecipe(newRecipe)
    }

    const handleTitleChange = (value) => {
        setTitle(value)
        setEditRecipe({
            ...editRecipe,
            title: value
        })
    }

    const handleDescriptionChange = (value) => {
        setDescritpion(value)
        setEditRecipe({
            ...editRecipe,
            description: value
        })
    }

    return (
        <div className="recipe-edit-form">
        <input type="text" className="recipe-edit-title-input" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
        <textarea rows={10} className="recipe-edit-description-input" value={description} onChange={(e) => handleDescriptionChange(e.target.value)}/>
        <h2 className="recipe-ingredients-title">Ingredients</h2>
        <ul className="recipe-ingredients-list">
          <IngredientList editRecipe={editRecipe} handleDeleteIngredient={handleDeleteIngredient}   handleTitleChange={handleChangeIngredientTitle} />
          <form className="recipe-new-ingredient" onSubmit={(e) => {
            handleAddIngredient(e, ingredient)
            setIngredient('')}}>
            <input type="text" value={ingredient} onChange={(e) => setIngredient(e.target.value)} className="recipe-new-ingredient-input" placeholder="Add a new ingredient..."/>
            <button className="recipe-new-ingredient-button">Add</button>
          </form>
        </ul>
        <div className="recipe-edit-actions">
          <button onClick={() => handleSaveRecipe(editRecipe)} className="recipe-edit-save-button">Save</button>
          <button onClick={() => handleAddShopping(editRecipe.ingredients)} className="recipe-edit-cart-button">Add to shopping list</button>
        </div>
      </div>
    )
}

export default RecipeView