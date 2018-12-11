var LocalStrategy=require('passport-local').Strategy;
import serviceUsuario_ from "./services/seguridades/usuarioService";
import rolUsuario_ from "./services/seguridades/rolService";
let serviceUsuario = new serviceUsuario_(); 
let rolUsuario = new rolUsuario_(); 

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
           
            item=rolUsuario.getRolesOfUserByUserID(rows[0].id);
            item.then(roles =>{
              rows[0]['roles']=roles;
               return done(null, rows[0]); 
            }).catch(err=>{
              console.log(err);
                return done(null, false, req.flash('info', 'No se ha podido cargar sus roles'));
            });

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