const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  handlerErrors
} = require('../util');
const _ = require('underscore');
const Usuario = require('../models/usuario.model');

const app = express();

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email)
    return handlerErrors(res, 'Falta body email');

  if (!password)
    return handlerErrors(res, 'Falta body password');

  Usuario.findOne({
    email,
    estado: true
  }, (error, usuarioDB) => {
    if (error) return handlerErrors(res, error, 500);
    if (!usuarioDB) return handlerErrors(res, 'No existe usuario');
    if (!bcrypt.compareSync(password, usuarioDB.password))
      return handlerErrors(res, 'Usuario o contraseña incorrectos');

    const token = jwt.sign({
      usuario: usuarioDB
    }, process.env.JWT_SEED, {
      expiresIn: process.env.JWT_CADUCIDAD
    });
    
    res.json({
      ok: true,
      usuario: usuarioDB,
      token
    });
  });
});

module.exports = app;