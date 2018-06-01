const express = require('express');
const router = express.Router();

const recipeFile = require('../model/recipe');
const Recipe = recipeFile.Recipe;

// Création d'un produit
router.route('/creation')
  .get((req, res) => {
    res.send(`Formulaire nouvelle recette
      <form method="post">
        <input type="submit" value="Créer" />
      </form>
    `);
  })
  .post((req, res) => {
    console.log(req.body);

    /**
     * Enregistrement avec "save" de l'objet
     */
    /* 
    // Ajout de la recette en BDD
    const maRecette = new Recipe({
      name: 'Cookies au chocolat praliné',
      introduction: 'Recette de cookies de ma grand-mère, elle est super bonne. Créée en 1840 et transmise de génération en génération.',
      nbIngredients: 7,
      publishedAt: new Date()
    });

    maRecette.save((err, recipe) => {     
        if(err) {        
          console.log(err);      
        } 
        else {        
          console.log(recipe);      
        }
    });
    */

    /**
     * Enregistrement avec "create" de la classe du modèle
     */
    Recipe.create(
      {
        name: 'Cookies au chocolat praliné',
        introduction: 'Recette de cookies de ma grand-mère, elle est super bonne. Créée en 1840 et transmise de génération en génération.',
        nbIngredients: 7,
        publishedAt: new Date(),
        ingredients: [
          { name: 'farine', unit: 'g', quantity: 100},
          { name: 'levure', unit: 'sachet', quantity: 0.5}
        ]
      },
      (err, recipe) => {     
        if(err) {        
          console.log(err);      
        } 
        else {        
          console.log(recipe);      
        }
      }
    );

    res.send('Recette créée');
  })
;

router.get('/', (req, res) => {
  // Récupération des recettes
  Recipe.find(
    (err, recipes) => {
      if(err) { next(err); }
      else {
        console.log('Recettes récupérées');
        console.log(recipes);

        // Renvoi vers une vue (pour afficher les recettes)
        res.render('product/list', { recipes: recipes});
      }
    }
  );

});


router.put('/modification' , (req, res) => {
    res.send('Produit modifié');
  });

router.delete('/suppression' , (req, res) => {
    res.send('Produit supprimé');
});

router.get(
    '/detail/:name', 
    (req, res, next) => {
        console.log("[spy] : Accès au détail du produit");
        // On passe au middleware suivant
        next();
    }, 
    (req, res) => {
        res.send(`<h1>Détail du produit : ${req.params.name}</h1>`);
    }
);

module.exports = router;