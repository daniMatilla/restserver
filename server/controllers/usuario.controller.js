const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario.model');
const {
  handlerErrors
} = require('../util');

const app = express();

app.get('/usuario', (req, res) => {
  const skip = req.query.pagina ? parseInt(req.query.pagina) : 0;
  const limite = req.query.limite ? parseInt(req.query.limite) : 0;

  if (isNaN(skip)) {
    handlerErrors(res, {
      message: 'Query página; se esperaba un número.'
    });
  }

  if (isNaN(limite)) {
    handlerErrors(res, {
      message: 'Query límite; se esperaba un número.'
    });
  }

  Usuario.find({
    estado: true
  }, null, {
    skip: skip * limite,
    limite
  }, (error, usuariosDB) => {
    if (error) handlerErrors(res, error);

    Usuario.count({
      estado: true
    }, (error, total) => {
      if (error) handlerErrors(res, error);

      res.json({
        ok: true,
        usuarios: usuariosDB,
        total
      });
    });
  });
});

app.post('/usuario', (req, res) => {
  const body = req.body;

  const usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((error, usuarioDB) => {
    if (error) handlerErrors(res, error);

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put('/usuario/:id', (req, res) => {
  const id = req.params.id;

  const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
  console.log(body);

  Usuario.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  }, (error, usuarioDB) => {
    if (error) handlerErrors(res, error);

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.delete('/usuario/:id', (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndUpdate(id, {
    estado: false
  }, {
    new: true
  }, (err, usuarioDB) => {
    if (err) handlerErrors(res, err);

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

module.exports = app;