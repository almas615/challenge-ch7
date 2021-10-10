const router = require('express').Router();
const user = require("../controllers/userController")
const restrict = require('../middlewares/restrict')
const onlySuper = require('../middlewares/superUser')

router.get('/', restrict, onlySuper, user.getUsers)

router.post('/', restrict, onlySuper, user.postUsers)

router.get('/delete/:id', restrict, onlySuper, user.deleteUser)

router.post('/update/:id', restrict, onlySuper, user.updateUser)

module.exports = router;