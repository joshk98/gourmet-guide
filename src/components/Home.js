import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import Alert from "./Alert";
import SideBar from "./SideBar";

import "../styles/home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState({ message: "", isSuccess: false });
  const location = useLocation();
  const { search } = location;

  useEffect(() => {
    setAlert({ message: "", isSuccess: false });
    axios
      .get("http://localhost:3000/api/v1/Recipe")
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((error) => {
        setAlert({
          message: "Server error, please try again later.",
          isSuccess: false,
        });
        console.error("Error finding recipes: ", error);
        setTimeout(() => {
          setAlert({ message: "", isSuccess: false });
        }, 2000);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/Recipe${search}`)
      .then(({ data }) => setRecipes(data))
      .catch((error) => console.error(error));
  }, [search]);

  return (
    <div className="container">
      <div className="side-bar">
        <SideBar search={search} />
      </div>
      <div className="recipes">
        <Alert message={alert.message} success={alert.isSuccess} />
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} {...recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
