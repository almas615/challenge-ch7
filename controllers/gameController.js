const {
    User_game,
    User_game_biodata,
    User_game_history
} = require('../models')

const getGamePage = (req, res) => {
    res.render('gameSuit')
}

module.exports = {
    getGamePage
}