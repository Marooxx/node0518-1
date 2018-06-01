// On importe les modules dont on a besoin (module tiers)
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

// On importe les différents routeurs (les modules à nous (pour le routage))
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productCreationRouter = require('./routes/product-creation');

let app = express();

// Définition du moteur de vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares de base 
app.use(logger('dev')); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Rendre des assets : CSS/JS/IMG/FONTS
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/dist', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/food');
let database = mongoose.connection;
database.on('error', (err) => {
  console.log('Erreur lors de la connexion à MongoDB'),
  console.log(err);
})
database.on('open', () => console.log('Connexion à MongoDB : ok '));

// Système de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produit', productCreationRouter);

/**
 * Routes définies à la main
 * ##todo : Exporter les 3 routes dans un fichier séparé
 */
// Création d'une page de contact
app.get('/contact', (req, res) => {
  res.send('<h1>Page contact</h1>');
});

// Route permettant de rendre du JSON
app.get('/api/products', (req, res) => {
  const monObjet = { "name" : "hamac" };
  res.json(monObjet);
});

app.get(/^[/](ba)+r+$/, (req, res) => {
  res.send('URL catched !');
});

// Au cas où la route demandée n'existe pas => Gestion de l'erreur 404 : Not Found
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware d'erreurs : executé quand il y a une erreur
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
