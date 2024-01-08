// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./src/routers/routes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tickets')
  .then(() => console.log('Connected!'));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a la base de datos:'));
db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

routes(app);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});