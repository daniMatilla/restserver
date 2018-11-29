const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const rolesValidos = {
  values: ['USER_ROLE', 'ADMIN_ROLE'],
  message: '{VALUE} no es un rol valido'
};

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'El email es requerido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida']
  },
  img: {
    type: String
  },
  role: {
    type: String,
    default: 'USER_ROLE',
    enum: rolesValidos
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

usuarioSchema.methods.toJSON = function () {
  const u = this;
  const uObject = u.toObject();
  delete uObject.password;

  return uObject;
  
};

mongoose.plugin(uniqueValidator, {
  message: 'El {PATH} debe ser único'
});

module.exports = mongoose.model('Usuario', usuarioSchema);