const express = require('express');
const app = express();

app.use(require('./controllers/usuario.controller'));
app.use(require('./controllers/login.controller'));

module.exports = app;