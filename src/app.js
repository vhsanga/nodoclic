var createError = require('http-errors');
var express = require('express');
var session=require('express-session');
var path = require('path');
var flash=require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');
require('./server/passport')(passport);
var distPath = __dirname;
var srcPath = path.dirname(distPath) + "/src";

var config = require('./lib/config');

var app = express();

// view engine setup
app.set('views', path.join(srcPath, 'views'));
app.set('view engine', config().views.engine);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(srcPath, 'public')));


app.use(
  //express.session({ store: new RedisStore, secret: config().session.secret })
    session({ 
        secret: config().session.secret,   //clave secreta de la forma como la aplicacion recuperara la sesion
        //store: new RedisStore(),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: config().session.maxAge
        }
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/controllers/routes')(app);


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

//module.exports = app;
console.log("Corriendo Nodoclic en "+config().entorno+", en "+config().serverPort );
app.listen(config().serverPort);