import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";

import "../styles/sidebar.css";

const buildQueryString = (search, operation, valueObj) => {
  const currentQueryParams = qs.parse(search, { ignoreQueryPrefix: true });
  const newQueryParams = {
    ...currentQueryParams,
    [operation]: JSON.stringify({
      ...JSON.parse(currentQueryParams[operation] || "{}"),
      ...valueObj,
    }),
  };
  return qs.stringify(newQueryParams, { addQueryPrefix: true, encode: false });
};

const Sidebar = ({ search }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const newQueryString = buildQueryString(search, "query", {
      title: { $regex: query },
    });
    navigate(newQueryString);
  };

  return (
    <div className="sidebar__container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="Search by title"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="sidebar__links">
        <Link to="/">Show All</Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Italian" })}>
          Italian Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Chinese" })}>
          Chinese Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Japanese" })}>
          Japanese Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Indian" })}>
          Indian Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Mexican" })}>
          Mexican Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "French" })}>
          French Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Thai" })}>
          Thai Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Spanish" })}>
          Spanish Recipes
        </Link>
        <Link
          to={buildQueryString(search, "query", { cuisine: "Middle Eastern" })}
        >
          Middle Eastern Recipes
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Korean" })}>
          Korean Recipes
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "None",
          })}
        >
          None
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Vegetarian",
          })}
        >
          Vegetarian
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Vegan",
          })}
        >
          Vegan
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Gluten-Free",
          })}
        >
          Gluten-Free
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Dairy-Free",
          })}
        >
          Dairy-Free
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Pescatarian",
          })}
        >
          Pescatarian
        </Link>
        <Link to={buildQueryString(search, "sort", { servings: 1 })}>
          Servings Size Ascending
        </Link>
        <Link to={buildQueryString(search, "sort", { servings: -1 })}>
          Servings Size Descending
        </Link>
        <Link to={buildQueryString(search, "sort", { totalTime: 1 })}>
          Total Time Ascending
        </Link>
        <Link to={buildQueryString(search, "sort", { totalTime: -1 })}>
          Total Time Descending
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
