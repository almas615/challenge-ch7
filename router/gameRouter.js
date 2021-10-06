const router = require('express').Router();
const game = require("../controllers/gameController")
const restrict = require('../middlewares/restrict')

router.get('/', game.getGamePage);

module.exports = router;