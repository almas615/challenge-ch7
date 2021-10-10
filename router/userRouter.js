const router = require('express').Router();
const user = require("../controllers/userController")
const restrict = require('../middlewares/restrict')
const role = require('../middlewares/role');

router.get('/', restrict, onlySuperUser, user.getUsers)

router.post('/', restrict, onlySuperUser, user.postUsers)

router.get('/delete/:id', restrict, onlySuperUser, user.deleteUser)

router.post('/update/:id', restrict, onlySuperUser, user.updateUser)

//hak akses
router.get('/api/listUsers', restrict, role, user.getUsersAll)

module.exports = router;