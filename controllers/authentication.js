const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
  console.log(req.body);
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