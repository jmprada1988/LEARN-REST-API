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
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Contraseña debe tener mínimo 8 caracteres.')
      .matches(/\d/)
      .withMessage('Contraseña debe tener un número'),
    body('confirmPassword')
      .trim()
      .custom((value, {req}) => {
        if (value !== req.body.password) {
          throw new Error('La confirmacion de la contraseña no es igual a la ingresada arriba.');
        };
        return true;
      })
    ,
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
router.get('/verifyAccount', authenticationController.verifyAccount);
router.post('/login', authenticationController.login);


module.exports = router;