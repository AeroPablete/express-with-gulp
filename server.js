// Get the packages we need
var express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    path = require('path');

// -- APP & DB --
// Set App, Port and DataBase
var app = express();
var port = process.env.PORT || 3000;
// mongoose.connect('mongodb://localhost:27017/wer-app-db2');

// -- APP CONFIGURATION --
// Use Body Parser so we can grab information from POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure the app to handle CORS requests
app.use(function(req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  next();
});

// Log All Requests to the console
app.use(morgan('dev'));

// -- ROUTER --
var apiRouter = express.Router();

// Initial Data Route
apiRouter.route('/set-data')
  .get(function(req, res) { res.send('Set Initial Data') });

// Register all our routes with /api
app.use('/api', apiRouter);

// -- Setup CLIENT --
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', function(req, res) {

  // Load the single view file -- AngularJS will handle the page changes on the front-end
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port);
console.log('App Running on Port ' + port);
