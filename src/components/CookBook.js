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
      <Instructions />
    </div>
  );
};

const Ingredients = () => {
  return (
    <div className="ingredients">
      <div className="ingredients-list">
        <h2>Ingredients</h2>
        <ul className="vertical-list" />
      </div>
    </div>
  );
};

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>Instructions</h2>
      <div className="instruction-steps" />
      <ul className="vertical-list" />
    </div>
  );
};

export default Cookbook;
