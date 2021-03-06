var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require("mongoose");
var cors=require('cors');

/* var url="mongodb://localhost:27017/informes"; */
var url="mongodb://admin:admin15min@ds155278.mlab.com:55278/heroku_t8d64ftk";
mongoose.connect(url).then(db=>{
  console.log("Se ha conectado a la base de datos");
})

var usersRouter=require('./routes/user');
var hermanosRouter = require('./routes/hermano');
var informesRouter = require('./routes/informe');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users',usersRouter);
app.use('/api/publicadores',hermanosRouter);
app.use('/api/informes',informesRouter);

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
