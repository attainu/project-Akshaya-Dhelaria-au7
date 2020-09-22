var express = require('express');
var router = express.Router();
var {createCategory , getAllCategories , updateCategory , deleteCategory} = require('../controller/category_controller')
var categoryValidation = require('../validation/category_validation')
var userAuth = require('../middleware/auth')

/* GET home page. */
router.post('/category' ,categoryValidation, userAuth , createCategory)
router.get('/allcategory' , getAllCategories)

//Update not working
router.put('/update/:_id' , userAuth , categoryValidation , updateCategory)

router.delete('/delete/:_id' , userAuth , deleteCategory)

module.exports = router;
