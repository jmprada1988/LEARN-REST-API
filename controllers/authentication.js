const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validación Fallida');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const {email, password, name, lastname, country, state, city} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPassword,
      name,
      lastname,
      country,
      state,
      city
    });
    const result = await user.save();
    res.status(201).json({message: 'Usuario Creado', userId: result._id});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.login = async (req, res, next) => {
  const {email, password} = req.body;
  let userSaved;
  try {

    const user = await User.findOne({email});
    if (!user) {
      const error = new Error('No se encontró usuario asociado al correo ingresado.');
      error.statusCode = 401;
      throw error;
    }
    userSaved = user;
    const passwordMatch = await  bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      const error = new Error('Contraseña Incorrecta.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({
      email: userSaved.email,
      userId: userSaved._id.toString()
    },
    process.env.JWT,
    {expiresIn: '2h'}
    );
    res.status(200).json({token, userId: userSaved._id.toString() });
    return;
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}