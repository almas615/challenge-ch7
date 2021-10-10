const router = require('express').Router();
const user = require("../controllers/userController")
const restrict = require('../middlewares/restrict')
const role = require('../middlewares/role');

router.get('/', user.getUsers)

router.post('/', user.postUsers)

router.get('/delete/:id', user.deleteUser)

router.post('/update/:id', user.updateUser)

//hak akses
router.get('/api/listUsers', restrict, role, user.getUsersAll)

module.exports = router;