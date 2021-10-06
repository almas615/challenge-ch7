const router = require('express').Router();
const user = require("../controllers/userController")
const restrict = require('../middlewares/restrict')

router.get('/', user.getUsers)

router.post('/', user.postUsers)

router.get('/delete/:id', user.deleteUser)

router.post('/update/:id', user.updateUser)

module.exports = router;