var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyparser = require('body-parser')

var indexRouter = require('./controllers/index');
var groceryRouter = require('./controllers/groceries');
var usersRouter = require('./controllers/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended : true}))

app.use('/', indexRouter);
app.use('/grocery', groceryRouter);
app.use('/users', usersRouter);

// mongoDB connection with mongoose
const mongoose = require('mongoose')
const globals = require('./config/globals')

mongoose.connect(globals.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    (res) => {
      console.log('Connected to MongoDB')
    }
).catch(() => {
  console.log('Could not connect to MongoDB')
})

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

app.listen(3000,() => {
  console.log('Server is running on port 3000. ')
})

module.exports = app;
