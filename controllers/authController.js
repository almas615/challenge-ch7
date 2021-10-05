const {
    User_game,
    User_game_biodata,
    User_game_history
} = require('../models')
const passport = require('passport')

function format(user) {
    const {
        id,
        username
    } = user
    return {
        id,
        username,
        accessToken: user.generateToken()
    }
}

const getLogin = (req, res) => {
    res.render('auth/login')
}

const getRegister = (req, res) => {
    res.render('auth/register')
}

const postLogin = (req, res) => {
    User_game.authenticate(req.body)
        .then(user => {
            res.json(
                format(user)
            )
        })
}

const postRegister = (req, res, next) => {
    User_game.register(req.body)
        .then(() => {
            res.redirect('/auth/login')
        })
        .catch(err => next(err))
}
module.exports = {
    getLogin,
    getRegister,
    postRegister,
    postLogin
}