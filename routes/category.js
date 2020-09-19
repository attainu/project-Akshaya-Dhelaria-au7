var express = require('express');
var router = express.Router();
var {createCategory , getAllCategories} = require('../controller/category_controller')
var categoryValidation = require('../validation/category_validation')
var userAuth = require('../middleware/auth')

/* GET home page. */
router.post('/category' ,categoryValidation, userAuth , createCategory)
router.get('/allcategory' , getAllCategories)

module.exports = router;
