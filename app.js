let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

// On importe les différents routeurs
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

// Système de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produit', productCreationRouter);

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
