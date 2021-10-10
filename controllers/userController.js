const {
    User_game,
    User_game_biodata,
    User_game_history
} = require('../models')

const getUsers = (req, res) => {
    User_game.findAll({
            include: {
                model: User_game_biodata,
                as: 'biodata'
            },
            where: {
                hak_akses: "user"
            }
        })
        .then(users => {
            // res.render('dashboard/users', {
            //     users
            // })
            res.render('dashboard/index', {
                users
            })
        })
}
const postUsers = (req, res) => {
    User_game.create({
            username: req.body.username,
            email: req.body.email,
            password: User_game.encrypt(req.body.password),
            hak_akses: "user"
        })
        .then(() => {
            User_game.findOne({
                    attributes: ['id'],
                    order: [
                        ['id', 'DESC']
                    ]
                })
                .then(user => {

                    User_game_biodata.create({
                            user_id: user.id,
                            nama: req.body.nama
                        })
                        .then(() => {
                            res.redirect('/users')

                        })
                })
        })
}

const deleteUser = (req, res) => {
    User_game_biodata.destroy({
            where: {
                user_id: req.params.id
            }
        })
        .then(() => {
            User_game.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => {
                    res.redirect('/users')
                })
        })
}

const updateUser = (req, res) => {
    User_game.update({
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(() => {
            User_game_biodata.update({
                    nama: req.body.nama
                }, {
                    where: {
                        user_id: req.params.id
                    }
                })
                .then(() => {
                    res.redirect('/users')
                })
        })
}

const getUsersAll = (req, res) => {
    User_game.findAll({
            include: {
                model: User_game_biodata,
                as: 'biodata'
            },
            // where: {
            //     hak_akses: "user"
            // }
        })
        .then(user => {
            res.json(user)
        });
}
module.exports = {
    getUsers,
    postUsers,
    deleteUser,
    updateUser,
    getUsersAll
}