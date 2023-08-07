/* eslint-disable consistent-return */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());

const YOUR_MONGODB_URI =
  "mongodb+srv://gourmet-guide:ETggxEgRUMvj3HXo@gourmet-guide.siih5i2.mongodb.net/test?retryWrites=true&w=majority";

mongoose
  .connect(YOUR_MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const recipeSchema = new mongoose.Schema({
  title: String,
  cuisine: String,
  dietaryRequirements: String,
  ingredients: [
    {
      name: String,
      measurement: {
        value: Number,
        metric: String,
      },
    },
  ],
  instructions: String,
  prepTime: Number,
  cookingTime: Number,
  servings: Number,
});

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);
const Favourites = mongoose.model("Favourites", favouriteSchema);

app.post("/api/v1/recipes", async (req, res) => {
  const recipeData = req.body;
  try {
    const newRecipe = await Recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const recipeData = req.body;
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipeData, {
      new: true,
    });
    if (!updatedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/v1/recipes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/v1/favourites", async (req, res) => {
  const { recipeId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(recipeId)) {
      return res.status(400).json({ error: "Invalid recipeId format" });
    }

    const existingRecipe = await Recipe.findById(recipeId);
    if (!existingRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const newFavourite = await Favourites.create({ recipeId });

    res.status(201).json(newFavourite);
  } catch (error) {
    console.error("Error adding recipe to favourites:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/favourites", async (req, res) => {
  try {
    const favourites = await Favourites.find().populate("recipeId");
    res.json(favourites);
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/v1/favourites/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Favourites.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/v1/favourites/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Favourites.findByIdAndDelete(id);
    if (!deletedRecipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
