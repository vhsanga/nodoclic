'use strict';
var LocalStrategy=require('passport-local').Strategy;
var bcrypt=require('bcryptjs');

//variables de ruteo
var index;
var home;
var compras;
var proveedor;
var cliente;
var producto;
var venta;
var usuario;
var admin;
var adminInterno;
    

var AuthMiddleware = require('../../middleware/auth');

module.exports = function (app) {

    var passport = require('passport');
    //seteando las rutas...
    index = require('./index');
    compras = require('./comprasController');
    compras = require('./comprasController');
    proveedor = require('./proveedorController');
    cliente = require('./clienteController');
    producto = require('./productoController');
    venta = require('./ventaController');
    usuario = require('./usuarioController');
    admin = require('./adminController');
    adminInterno

    //implantacion d las rutas
    app.use('/admin', admin);
    app.use('/', index);
    app.use('/compras',AuthMiddleware.isLogged, compras);
    app.use('/proveedor',AuthMiddleware.isLogged, proveedor);
    app.use('/clientes',AuthMiddleware.isLogged, cliente);
    app.use('/productos',AuthMiddleware.isLogged, producto);
    app.use('/ventas',AuthMiddleware.isLogged, venta);
    app.use('/usuario',AuthMiddleware.isLogged, usuario);
    


    //app.use('/home',AuthMiddleware.isLogged, home);

    /*app.use('/agenda/calendario',AuthMiddleware.isLogged, agenda.calendario);
    app.use('/login', login);
    app.use('/usuario', AuthMiddleware.isLogged, usuario);*/


    app.use('/login', passport.authenticate('local', { successRedirect: '/',
                    failureRedirect: '/',
                    failureFlash: true }) );

    app.use('/loginAdmin', passport.authenticate('local', { successRedirect: '/admin',
        failureRedirect: '/admin',
        failureFlash: true }), (req, res)=> {
                
    });




    app.use('/loginProvisional', function(req, res, next) {
          passport.authenticate('local', function(err, user, info) {
            if (err) { 
                return res.json(false); 
            }
            if (!user) { 
                return res.json(false); 
            }
            req.logIn(user, function(err) {
              if (err) {return res.json(false);  }
              return res.json(true)
            });
          })(req, res, next);
    });


    app.get('/salir', function(req, res, next) {
        req.logout();
        req.session.destroy();
        res.redirect('/');    
    });

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
