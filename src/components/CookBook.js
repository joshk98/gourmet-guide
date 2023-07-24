import React from "react";
import "../styles/cookbook.css";

const Cookbook = () => {
  return (
    <div className="cookbook">
      <div className="list">
        <h2>My Recipes</h2>
        <ul className="vertical-list" />
      </div>
      <Ingredients />
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients">
      <div className="ingredients-list">
        <h2>Ingredients</h2>
      </div>
    </div>
  );
};

export default Cookbook;
