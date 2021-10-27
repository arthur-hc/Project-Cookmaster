const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', require('./routes/signinRoutes'));

app.use('/login', require('./routes/loginRoutes'));

module.exports = app;
