const express = require('express');
const app = express();
const port = 3000;
const unzipper = require('unzipper');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

app.post('/mail', jsonParser, function (req, res) {

  var fs = require('fs'), data = fs.readFileSync('htmlTemplate.txt', 'utf8'), htmlString = data.toString(), API_KEY = req.body.apikey.toString(), emailId = req.body.email.toString(), fromEmailId = req.body.fromEmailId.toString();
  //console.log(' req.body', req.body);
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(API_KEY);
  const msg = {
    to: emailId,
    from: fromEmailId,
    subject: 'Testing Email template Generation',
    text: 'The stack which is used (node.js) Library express, body parser, unzipper',
    html: htmlString,
  };
  sgMail.send(msg);
  res.send(`Mail Sent Successfully`);

})

app.get('/', (req, res) => {
  var fs = require('fs');
  var data = fs.readFileSync('Homepage.html', 'utf8');
  var htmlString = data.toString();
  res.send(htmlString)
});

app.get('/crackPassword', (req, res, next) => {
  var result = '', i = -1, j = 0, key = "", v = 1, characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  (async () => {

    try {
      var charactersLength = characters.length;
      while (result == '') {

        key = `${characters[i] ? characters[i] : ''}${characters[j++]}`;
        if (j == charactersLength) {
          i++;
          j = 0;
        }
        if (i == charactersLength)
          break;

        const directory = await unzipper.Open.file('./assignment.zip');
        const extracted = await directory.files[0].buffer(`Twg48wTM${key}`);
        //console.log('String',extracted.toString());
        //console.log(`KEY${extracted} - Twg48wTM${key} - ${v++}`)
        key = '';
        result = extracted; // This will print the file content
        res.send(result)
      }
    }
    catch (e) {
      result = e;
      res.send(result);
    }
  })();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})