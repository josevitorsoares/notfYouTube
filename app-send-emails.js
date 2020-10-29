var nodemailer = require('nodemailer');

var remetente = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: 'jose.vitor.clashbr@gmail.com',
        pass: 'photoshop625'
    }
});
//erikacarvalho771@gmail.com, danielsantosalves672@gmail.com
var emailASerEnviado = {
    from: 'jose.vitor.clashbr@gmail.com',
    to: 'erikacarvalho771@gmail.com',
    subject: 'Email Automático com Node JS',
    text: 'Testando o email automático com NodeJS',
};

remetente.sendMail(emailASerEnviado, function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado com sucesso!');
    }
});
