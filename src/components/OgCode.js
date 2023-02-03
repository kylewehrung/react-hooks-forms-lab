/////////////////////////////////////////App
import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import itemData from "../data/items";

function App() {
  const [items, setItems] = useState(itemData);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function newItemSubmit(newItem) {
    setItems([...items, newItem])
  }

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <ShoppingList items={items} newItemSubmit={newItemSubmit}/>
    </div>
  );
}

export default App;

////////////////////////////////// Header
import React from "react";

function Header({ isDarkMode, onDarkModeClick }) {
  return (
    <header>
      <h2>Shopster</h2>
      <button onClick={onDarkModeClick}>
        {isDarkMode ? "Dark" : "Light"} Mode
      </button>
    </header>
  );
}

export default Header;

//////////////////////////////// ShoppingList
import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, newItemSubmit  }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("")

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }


  const itemsToDisplay = items
  .filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory 
  )
  .filter (
    (item) => item.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ShoppingList">
      <ItemForm newItemSubmit={newItemSubmit}/>
      <Filter 
      search={search}
      setSearch={setSearch}
      onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

//////////////////////////////// ItemForm
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function ItemForm({ newItemSubmit }) {
const [formData, setFormData] = useState({
    name: "",
    category: "Produce",
})


function handleNewItem(event) {
setFormData({
    ...formData,
    [event.target.name]: event.target.value
})
}

function handleSubmit(event) {
    event.preventDefault()
    newItemSubmit({
        id: uuid(),
        ...formData
    })
}


  return (
    <form 
    onSubmit={handleSubmit}
    className="NewItem">
      <label>
        Name:
        <input 
        onChange={handleNewItem}
        value={formData.name}
        type="text" 
        name="name" />
      </label>

      <label>
        Category:
        <select 
        onChange={handleNewItem}
        value={formData.category}
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

////////////////////////////// Filter
import React from "react";

function Filter({ onCategoryChange, search, setSearch }) {

function handleChange(event) {
    setSearch(event.target.value)
}


  return (
    <div className="Filter">
      <input 
      onChange={handleChange}
      value={search}
      type="text" 
      name="search" 
      placeholder="Search..." />

      <select name="filter" onChange={onCategoryChange}>
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;

//////////////////////////////////////// Item
import React, { useState } from "react";

function Item({ name, category }) {
  const [isInCart, setIsInCart] = useState(false);

  function handleAddToCartClick() {
    setIsInCart((isInCart) => !isInCart);
  }

  return (
    <li className={isInCart ? "in-cart" : ""}>
      <span>{name}</span>
      <span className="category">{category}</span>
      <button
        className={isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {isInCart ? "Remove From" : "Add to"} Cart
      </button>
    </li>
  );
}

export default Item;

