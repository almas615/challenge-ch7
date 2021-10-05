const {
    User_game,
    User_game_biodata,
    User_game_history
} = require('../models')

const getLogin = (req, res) => {
    res.render('auth/login')
}

const getRegister = (req, res) => {
    res.render('auth/register')
}

module.exports = {
    getLogin,
    getRegister
}