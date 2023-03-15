function RecipeList({recipes, handleDelete, handleEdit}){
    return (
        <div className="recipe-book">
            {recipes.length ? (
                recipes.map(recipe => {
                    return (
            <div className="recipe" key={recipe.id}>
                <div className="recipe-title">{recipe.title}</div>
                <div className="recipe-actions">
                <button onClick={() => handleEdit(recipe.id)} className="recipe-edit-button">Edit</button>
                <button onClick={() => handleDelete(recipe.id)} className="recipe-delete-button">Delete</button>
                </div>
            </div>
                    )
                })
            ) : null}
        </div>
    )
}

export default RecipeList