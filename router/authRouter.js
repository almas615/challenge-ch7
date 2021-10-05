const router = require('express').Router();
const auth = require("../controllers/authController")

router.get('/login', auth.getLogin)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)
router.post('/login', auth.postLogin)
module.exports = router;