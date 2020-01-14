const express = require('express');
const { body } = require('express-validator');

const User = require('../models/user');
const authenticationController = require('../controllers/authentication');

const router = express.Router();

router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Por favor, ingrese un correo electrónico válido.')
      .custom(async (value, { req }) => {
        try {
          const userDocument = await User.findOne({ email: value});
          if(userDocument) {
            return Promise.reject('El Correo ingresado ya existe.');
          }
        } catch (err) {
          console.log(err);
        }
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Contraseña debe tener mínimo 8 caracteres.')
      .matches(/\d/)
      .withMessage('Contraseña debe tener un número'),
    body('name')
      .trim()
      .not()
      .isEmpty(),
    body('lastname')
      .trim()
      .not()
      .isEmpty(),
    body('country')
      .trim()
      .not()
      .isEmpty()
  ],
  authenticationController.signup
);
router.post('/login', authenticationController.login);


module.exports = router;