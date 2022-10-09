const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const exhbs = require('express-handlebars')

require('dotenv').config()

const indexRouter = require('./routes/index');
const categoriesRouter = require('./routes/categories');

const app = express();

require('./helper/db')(process.env.MONGO_URI)

const hbs = exhbs.create({
  layoutsDir: 'views/layouts',
  layout: 'layout',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true
  }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
