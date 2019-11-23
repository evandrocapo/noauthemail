var express = require('express');
const sendmail = require('sendmail')();
const sendgrid = require('@sendgrid/mail');
var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/email-sendmail', async function (req, res) { // error
    try {
        await sendmail({
            from: 'test@test.com',
            to: 'test2@test.com',
            subject: 'Titulo do email',
            html: 'Mensagem do email',
          }, function(err, reply) {
            console.log(err && err.stack);
            console.dir(reply);
            res.status(400).send('Email não enviado ! Erro interno');
        });
        res.status(200).send('Email enviado com sucesso');
    } catch (error) {
        res.status(400).send('Email não enviado ! Erro interno');
    }
});

app.get('/email-sendgrid', async function (req,res){
    const msg = {
        to: 'test@test.com',
        from: 'test2@test.com',
        subject: 'Titulo do email',
        text: 'Mensagem do email',
        html: '<strong>Tambem é possivel enviar um html da mensagem</strong>',
    }

    sendgrid.send(msg);
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});