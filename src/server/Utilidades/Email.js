'use strict'
var nodemailer = require('nodemailer');
var config = require('../../lib/config');



class Email {

    enviarEmailSeguridad(destino,contenido, callback) { 
      console.dir(config());
      console.log(config().views.engine)

        const  ASUNTO= "Nodoclic - Seguridad"
        var mailOptions = {
              from: config().email.from,
              to: destino,
              subject: ASUNTO,
              text: contenido
        };
        var transporter = nodemailer.createTransport({
              service: config().email.service,
              auth: {
                user: config().email.user,
                pass: config().email.pass
            }
        });
        transporter.sendMail(mailOptions, function(error, info){
          console.log('_____________________')
          console.dir(error);
          console.dir(info);
          callback(error, info);
            /*if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }*/
        });
    };


    





}

export default Email;
