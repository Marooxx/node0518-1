const express = require('express');
const router = express.Router();

// Création d'un produit
router.route('/creation')
  .get((req, res) => {
    res.send(`Formulaire  nouveau produit
      <form method="post">
        <label for="name">Nom du produit</label>
        <input type="text" name="name" id="name" />
        <input type="submit" value="Créer" />
      </form>
    `);
  })
  .post((req, res) => {
      console.log(req.body);
    res.send('Produit créé');
  })
;

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