const router = require('express').Router()
const {findCategoriesOfUser , updateCategoriesPostedByUser , deleteCategoriesPostedByUser} = require('../controller/profile_controller')
var userAuth = require('../middleware/auth')

router.get('/allcategories' , userAuth, findCategoriesOfUser)
router.put('/updating/:_id' , userAuth , updateCategoriesPostedByUser)
router.delete('/deleting/:_id' , userAuth , deleteCategoriesPostedByUser)

module.exports = router