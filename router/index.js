const router = require("express").Router();
const auth = require("./authRouter");
const user = require("./userRouter");

router.get("/", (req, res) => {
    res.render('index')
})
router.use("/auth", auth);
router.use("/users", user);

module.exports = router;