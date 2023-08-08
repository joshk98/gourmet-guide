import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SideBar from "./SideBar";
import RecipeCard from "./RecipeCard";

import "../styles/home.css";

const Home = ({ isLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isSideBarExpanded, setIsSideBarExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("0px");
  const [refresh, setRefresh] = useState(false);
  const [cookbookRecipes, setCookbookRecipes] = useState([]);
  const [addedToCookbook, setAddedToCookbook] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarExpanded(!isSideBarExpanded);
    setMaxHeight(isSideBarExpanded ? "0px" : "30em");
  };

  useEffect(() => {
    if (refresh) {
      window.location.reload();
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/recipes")
      .then(({ data }) => {
        setRecipes(data);
        setFilteredRecipes(data);

        const searchParams = new URLSearchParams(window.location.search);
        const cuisine = searchParams.get("cuisine");
        const dietary = searchParams.get("dietary");

        if (cuisine) {
          setSelectedCuisine(cuisine);
          const filtered = data.filter((recipe) => recipe.cuisine === cuisine);
          setFilteredRecipes(filtered);
        }

        if (dietary) {
          setSelectedDietary(dietary);
          const filtered = data.filter(
            (recipe) => recipe.dietaryRequirements === dietary,
          );
          setFilteredRecipes(filtered);
        }
      })
      .catch((error) => {
        console.error("Error finding recipes: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedSort) {
      const sorted = [...filteredRecipes].sort((a, b) => {
        if (sortOrder === "asc") {
          return a[selectedSort] - b[selectedSort];
        }
        return b[selectedSort] - a[selectedSort];
      });
      setFilteredRecipes(sorted);
    }
  }, [selectedCuisine, selectedDietary, selectedSort, sortOrder]);

  const updateURL = (cuisine, dietary, sort) => {
    const queryParams = new URLSearchParams();

    if (cuisine) {
      queryParams.set("cuisine", cuisine);
    }
    if (dietary) {
      queryParams.set("dietary", dietary);
    }
    if (sort) {
      queryParams.set("sort", sort);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `?${queryString}` : "/";
    window.history.pushState({}, "", url);
  };

  const handleFilterChange = (filterType, filterValue) => {
    if (filterType === "cuisine") {
      setSelectedCuisine(filterValue);
      const filtered = recipes.filter(
        (recipe) => recipe.cuisine === filterValue,
      );
      setFilteredRecipes(filtered);
      updateURL(filterValue, selectedDietary, selectedSort);
    } else if (filterType === "dietary") {
      setSelectedDietary(filterValue);
      const filtered = recipes.filter(
        (recipe) => recipe.dietaryRequirements === filterValue,
      );
      setFilteredRecipes(filtered);
      updateURL(selectedCuisine, filterValue, selectedSort);
    } else if (filterType === "sort") {
      if (filterValue === "totalTimeAsc") {
        setSelectedSort("totalTime");
        setSortOrder("asc");
      } else if (filterValue === "totalTimeDesc") {
        setSelectedSort("totalTime");
        setSortOrder("desc");
      } else {
        setSelectedSort(filterValue);
        setSortOrder("asc");
        if (filterValue === selectedSort) {
          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
      }
      updateURL(selectedCuisine, selectedDietary, selectedSort);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    if (order === "nameAsc") {
      const sorted = [...filteredRecipes].sort((a, b) =>
        a.title.localeCompare(b.title),
      );
      setFilteredRecipes(sorted);
    } else if (order === "nameDesc") {
      const sorted = [...filteredRecipes].sort((a, b) =>
        b.title.localeCompare(a.title),
      );
      setFilteredRecipes(sorted);
    } else {
      const sorted = [...filteredRecipes].sort((a, b) => {
        const totalA = a.prepTime + a.cookingTime;
        const totalB = b.prepTime + b.cookingTime;
        if (order === "asc") {
          return totalA - totalB;
        }
        return totalB - totalA;
      });
      setFilteredRecipes(sorted);
      updateURL(selectedCuisine, selectedDietary, selectedSort);
    }
  };

  const handleSearch = (searchText) => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredRecipes(filtered);
  };

  const handleShowAll = () => {
    setSelectedCuisine("");
    setSelectedDietary("");
    setSelectedSort("");
    setSortOrder("asc");
    setFilteredRecipes(recipes);
    updateURL("", "", "");
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/recipes/${recipeId}`);
      console.log("Recipe deleted:", recipeId);
      setRefresh(true);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/favourites")
      .then(({ data }) => {
        const cookbookRecipeIds = data.map((recipe) => recipe.recipeId);
        console.log("Cookbook Recipes:", cookbookRecipeIds);
        setCookbookRecipes(cookbookRecipeIds);
      })
      .catch((error) => {
        console.error("Error fetching cookbook recipes: ", error);
      });
  }, []);

  return (
    <div className="container">
      <div
        className={`side-bar ${isSideBarExpanded ? "expand-sidebar" : ""}`}
        style={{ maxHeight }}
      >
        <SideBar
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          handleSearch={handleSearch}
          handleShowAll={handleShowAll}
        />
      </div>
      <button
        className="toggle-sidebar-button"
        type="button"
        onClick={toggleSideBar}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <div className="recipes">
        {filteredRecipes.map((recipe) => {
          const isAddedToCookbook = cookbookRecipes.includes(recipe._id);
          return (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              handleDelete={handleDelete}
              setRefresh={setRefresh}
              addedToCookbook={isAddedToCookbook}
              setAddedToCookbook={setAddedToCookbook}
              isLoggedIn={isLoggedIn}
              {...recipe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
