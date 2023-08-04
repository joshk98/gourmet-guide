import React, { useState } from "react";
import "../styles/sidebar.css";

const SideBar = ({
  handleFilterChange,
  handleSortChange,
  handleSearch,
  handleShowAll,
}) => {
  const cuisines = [
    "Italian",
    "Chinese",
    "Japanese",
    "Indian",
    "Mexican",
    "French",
    "Thai",
    "Spanish",
    "Middle Eastern",
    "Korean",
  ];
  const dietaryRequirements = [
    "None",
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Pescatarian",
  ];

  const [searchText, setSearchText] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    handleSearch(searchText);
  };

  return (
    <div className="sidebar">
      <h2>Filter Recipes</h2>
      <div className="search-form">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Title"
          value={searchText}
          onChange={handleSearchInputChange}
        />
        <button
          type="button"
          className="search-button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
      <button type="button" className="show-all-button" onClick={handleShowAll}>
        Show All
      </button>
      <div className="cuisine-filters">
        <h3>Cuisine:</h3>
        <ul>
          {cuisines.map((cuisine) => (
            <li key={cuisine}>
              <button
                type="button"
                onClick={() => handleFilterChange("cuisine", cuisine)}
              >
                {cuisine}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="dietary-filters">
        <h3>Dietary Requirements:</h3>
        <ul>
          {dietaryRequirements.map((dietary) => (
            <li key={dietary}>
              <button
                type="button"
                onClick={() => handleFilterChange("dietary", dietary)}
              >
                {dietary}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sort-filters">
        <h3>Sort by Servings:</h3>
        <button
          type="button"
          onClick={() => handleFilterChange("sort", "servings")}
        >
          Ascending
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange("sort", "servings")}
        >
          Descending
        </button>
      </div>
      <div className="sort-filters">
        <h3>Sort by Total Time:</h3>
        <button type="button" onClick={() => handleSortChange("asc")}>
          Ascending
        </button>
        <button type="button" onClick={() => handleSortChange("desc")}>
          Descending
        </button>
      </div>
    </div>
  );
};

export default SideBar;
