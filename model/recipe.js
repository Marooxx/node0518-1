const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// On définit le schéma des ingrédients (schéma secondaire)
const ingredientsSchema = new Schema({
    name: String,
    unit: String,
    quantity: Number
});

// On définit la schéma (la "structure") de notre recette
const recipeSchema = new Schema({
    name: String,
    introduction: String,
    nbIngredients: Number,
    publishedAt: Date,
    ingredients: [ingredientsSchema]
});

// On créé le modèle (classe qui fait des actions)
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports.Recipe = Recipe;