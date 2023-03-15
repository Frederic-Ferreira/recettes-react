function ShoppingView({
  list,
  handleCheckOne,
  handleCheckAll,
  handleClearChecked,
  handleClearAll,
}) {
  return (
    <div className="shopping-list">
      <h2 className="shopping-list-title">Shopping list</h2>
      <ul className="recipe-ingredients-list">
        {list.length
          ? list.map((ingredient) => (
              <li className="recipe-ingredient" key={ingredient.id}>
                <label className="shopping-list-item">
                  <input
                    onClick={() => handleCheckOne(ingredient.id)}
                    type="checkbox"
                    checked={ingredient.done}
                  />
                  {ingredient.title}
                </label>
              </li>
            ))
          : null}
      </ul>
      <div className="shopping-list-actions">
        <button onClick={handleCheckAll} className="shopping-list-clear-button">
          Check all
        </button>
        <button
          onClick={handleClearChecked}
          className="shopping-list-clear-button"
        >
          Clear checked items
        </button>
        <button onClick={handleClearAll} className="shopping-list-clear-button">
          Clear all
        </button>
      </div>
    </div>
  );
}

export default ShoppingView;
