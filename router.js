const router = require("express").Router();
const auth = require("./controllers/authController");

router.get("/login", auth.getLogin)

module.exports = router;