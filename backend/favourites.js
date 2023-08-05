const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Favourites = mongoose.model("Favourites", favouriteSchema);

module.exports = Favourites;
