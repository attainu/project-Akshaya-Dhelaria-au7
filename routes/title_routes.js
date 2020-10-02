const router = require('express').Router()
const {createTitle,getTitlesOnTheBasisOfCategory} = require('../controller/title_controller')
var userAuth = require('../middleware/auth')

router.get('/titles/:category_id' , getTitlesOnTheBasisOfCategory)
router.post('/createtitle/:category_id' , userAuth , createTitle)

module.exports = router