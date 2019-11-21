var express = require('express');
var nodemailer = require('nodemailer');
const sendmail = require('sendmail')();
var app = express();

// const transporter = nodemailer.createTransport({
//     type: 'smtp',

// })

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/email', async function (req, res) { // error
    try {
        await sendmail({
            from: 'evandrocapovillajr@gmail.com',
            to: 'vandinhocapovilla@gmail.com',
            subject: 'test sendmail',
            html: 'Mail of test sendmail ',
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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});