import { useState } from "react";

function RecipeForm({ handleFormSubmit }) {
  const [title, setTitle] = useState("");

  return (
    <form
      className="new-recipe-form"
      onSubmit={(e) => {
        handleFormSubmit(e, title);
        setTitle("");
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="recipe-title-input"
        placeholder="Add a new recipe..."
      />
      <button className="recipe-create-button">Add</button>
    </form>
  );
}

export default RecipeForm;
