var express = require('express');
var router = express.Router();
var {createCategory , getAllCategories , updateCategory , deleteCategory , getLinkOnTheBasisOfCategory} = require('../controller/category_controller')
var categoryValidation = require('../validation/category_validation')
var userAuth = require('../middleware/auth')

router.post('/category' ,categoryValidation, userAuth , createCategory)
router.get('/allcategory' , getAllCategories)
router.post('/:Category' , getLinkOnTheBasisOfCategory)
router.put('/update/:_id' , userAuth , categoryValidation , updateCategory)
router.delete('/delete/:_id' , userAuth , deleteCategory)
router.post('/like')
module.exports = router;
