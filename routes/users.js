var express = require('express');
var router = express.Router();
var controller = require('../controller/signup_controller')
var {signup,login} = require('../validation/signupValidation')
var validationResults = require('../utils/validation')
var userAuth = require('../middleware/auth')

router.post('/signup' , signup , validationResults , controller.signup)
router.post('/login' , login , validationResults , controller.login)

module.exports = router;
