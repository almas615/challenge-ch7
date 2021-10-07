const router = require('express').Router();
const game = require("../controllers/gameController")
const restrict = require('../middlewares/restrict')

router.get('/', game.getGamePage);
router.get('/test/:idRoom', game.test);
router.post('/create-room', restrict, game.createRoom);

module.exports = router;