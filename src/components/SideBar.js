import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faPlateWheat,
  faClock,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

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
    navigate(newQueryString).catch((error) => {
      console.error("Error finding recipes:", error);
    });
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
          <FontAwesomeIcon icon={faGlobe} /> Italian
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Chinese" })}>
          <FontAwesomeIcon icon={faGlobe} /> Chinese
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Japanese" })}>
          <FontAwesomeIcon icon={faGlobe} /> Japanese
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Indian" })}>
          <FontAwesomeIcon icon={faGlobe} /> Indian
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Mexican" })}>
          <FontAwesomeIcon icon={faGlobe} /> Mexican
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "French" })}>
          <FontAwesomeIcon icon={faGlobe} /> French
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Thai" })}>
          <FontAwesomeIcon icon={faGlobe} /> Thai
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Spanish" })}>
          <FontAwesomeIcon icon={faGlobe} /> Spanish
        </Link>
        <Link
          to={buildQueryString(search, "query", { cuisine: "Middle Eastern" })}
        >
          <FontAwesomeIcon icon={faGlobe} /> Middle Eastern
        </Link>
        <Link to={buildQueryString(search, "query", { cuisine: "Korean" })}>
          <FontAwesomeIcon icon={faGlobe} /> Korean
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "None",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> No Dietary Requirements
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Vegetarian",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> Vegetarian
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Vegan",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> Vegan
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Gluten-Free",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> Gluten-Free
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Dairy-Free",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> Dairy-Free
        </Link>
        <Link
          to={buildQueryString(search, "query", {
            dietaryRequirements: "Pescatarian",
          })}
        >
          <FontAwesomeIcon icon={faCircleExclamation} /> Pescatarian
        </Link>
        <Link to={buildQueryString(search, "sort", { servings: 1 })}>
          <FontAwesomeIcon icon={faPlateWheat} /> Servings Size Ascending
        </Link>
        <Link to={buildQueryString(search, "sort", { servings: -1 })}>
          <FontAwesomeIcon icon={faPlateWheat} /> Servings Size Descending
        </Link>
        <Link to={buildQueryString(search, "sort", { totalTime: 1 })}>
          <FontAwesomeIcon icon={faClock} /> Total Time Ascending
        </Link>
        <Link to={buildQueryString(search, "sort", { totalTime: -1 })}>
          <FontAwesomeIcon icon={faClock} /> Total Time Descending
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
