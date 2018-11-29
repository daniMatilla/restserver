require('dotenv').config();
require('colors');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));
// parse application/json
app.use(bodyParser.json());

// Controllers
app.use(require('./index.controllers'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('hola REST');
});

const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const db_url = `mongodb://${db_host}:${db_port}/${db_name}`;

console.log('Base de datos => %s'.yellow, db_url);

// Conexión con la BBDD
mongoose.connect(db_url, (err) => {
  if (err) throw err;
  console.log(`Base de datos "${db_name}" => ONLINE`.green);

});

app.listen(process.env.NODE_PORT, () => {
  console.log(`Escuchando en puerto ${process.env.NODE_PORT}`.green);

});