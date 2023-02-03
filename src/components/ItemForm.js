import React, {useState} from "react";
import { v4 as uuid } from "uuid";
// import items from "../data/items";

function ItemForm({ onItemFormSubmit }) {


  const [newItemForm, setNewItemForm] = useState({
    name: "",
    category: "Produce",
  })

function handleNewItem(event) {
  setNewItemForm({
    ...newItemForm,
    [event.target.name]: event.target.value,
  })
}

function handleItemSubmit(event) {
  event.preventDefault()
    onItemFormSubmit ({
    id: uuid(),
    ...newItemForm
  })
}


  return (
    <form 
    onSubmit={handleItemSubmit}
    className="NewItem">
      <label>
        Name:
        <input 
        type="text" 
        name="name"
        value={newItemForm.name}
        onChange={handleNewItem} />
      </label>

      <label>
        Category:
        <select 
        value={newItemForm.category}
        onChange={handleNewItem}
        name="category">
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;
