
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2');
var flash = require('express-flash');
var session = require('express-session');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var topClassesRouter = require('./routes/topclasses');
var connection  = require('./database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(flash());

app.use('/', indexRouter);
app.use('/', usersRouter);
app.get('/helloworld', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, "public",'helloworld.html'));
});
app.get('/userfeedback', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, "public",'userfeedback.html'));
});

app.use('/search_topclasses', topClassesRouter);
app.get('/topclasses', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'public','topclasses.html'));
});

app.get('/coursereviews', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'public','coursereviews.html'));
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


app.listen(4000, function () {
  console.log('Node app is running on port 4000');
});
module.exports = app;
