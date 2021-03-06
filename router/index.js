const router = require("express").Router();
const auth = require("./authRouter");
const user = require("./userRouter");
const game = require("./gameRouter");

router.get("/", (req, res) => {
    res.render('index')
})
router.use("/auth", auth);
router.use("/users", user);
router.use("/game", game);

module.exports = router;