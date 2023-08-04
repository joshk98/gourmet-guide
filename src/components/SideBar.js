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
      {cuisines.map((cuisine) => (
        <button
          key={cuisine}
          type="button"
          onClick={() => handleFilterChange("cuisine", cuisine)}
          className="filter-button"
        >
          {cuisine}
        </button>
      ))}
      {dietaryRequirements.map((dietary) => (
        <button
          key={dietary}
          type="button"
          onClick={() => handleFilterChange("dietary", dietary)}
          className="filter-button"
        >
          {dietary}
        </button>
      ))}
      <button
        type="button"
        onClick={() => handleFilterChange("sort", "servings")}
        className="filter-button"
      >
        Servings Ascending
      </button>
      <button
        type="button"
        onClick={() => handleFilterChange("sort", "servings")}
        className="filter-button"
      >
        Servings Descending
      </button>
      <button
        type="button"
        onClick={() => handleSortChange("asc")}
        className="filter-button"
      >
        Time Ascending
      </button>
      <button
        type="button"
        onClick={() => handleSortChange("desc")}
        className="filter-button"
      >
        Time Descending
      </button>
      <button
        type="button"
        className="filter-button show-all-button"
        onClick={handleShowAll}
      >
        Show All
      </button>
    </div>
  );
};

export default SideBar;
