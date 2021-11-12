const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', require('./routes/signinRoutes'));

app.use('/login', require('./routes/loginRoutes'));

app.use('/recipes', require('./routes/recipesRoutes'));

app.use('/images', express.static(`${__dirname}/../uploads`));

module.exports = app;
