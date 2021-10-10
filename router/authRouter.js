const router = require('express').Router();
const auth = require("../controllers/authController")
const restrict = require('../middlewares/restrict')

router.get('/login', auth.getLogin)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.post('/login', auth.postLogin)
router.get('/logout', auth.getLogout)
router.get('/whoami', restrict, auth.whoami)

module.exports = router;