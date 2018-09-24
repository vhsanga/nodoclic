var LocalStrategy=require('passport-local').Strategy;
import serviceUsuario_ from "./services/seguridades/usuarioService";
let serviceUsuario = new serviceUsuario_(); 

var bcrypt=require('bcryptjs');

module.exports= function(passport){
  passport.serializeUser(function(user,done){
     done(null, user);
  });
  passport.deserializeUser(function(obj, done){
     done(null,obj);
  });
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passReqToCallback : true
      

  },function(req, username, password, done){      
    let item=serviceUsuario.getUsuarioByUsername(username);
    item.then(rows =>{
      console.log(rows);
      if(rows.length!==0){
        if (bcrypt.compareSync(password,rows[0].pass)) {
            return done(null, rows[0]);
        }else{
          return done(null, false, req.flash('info', 'Su clave es incorrecta'));
        }
      }else{
        return done(null, false, req.flash('info', 'El usuario no existe en el sistema.'));
      }        
    }).catch(err=>{
      console.log(err);
        return done(null, false, req.flash('info', 'Ha surgido un error al ingresar'));
    });

    

  }))
};