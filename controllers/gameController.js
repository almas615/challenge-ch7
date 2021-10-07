const {
    User_game,
    User_game_biodata,
    User_game_history,
    Room,
    Detail_room
} = require('../models')


const getGamePage = (req, res) => {
    res.render('gameSuit')
}

const test = (req, res) => {
    genereteFightRoom(req.params.idRoom);

}

const createRoom = (req, res) => {
    Room.create({
            nama_room: req.body.nama_room
        })
        .then((room) => {
            let idUser = req.user.id;
            let idRoom = room.id;
            genereteDetailRoom(idRoom, idUser);
        })
        .then(() => {
            res.send("berhasil create room")
        })


}

const genereteDetailRoom = (idRoom, idUser) => {
    let jenis_player;
    let player;
    for (let i = 1; i <= 2; i++) {
        (i == 1) ? jenis_player = "player1": jenis_player = "player2";
        (i == 1) ? player = idUser: player = null;
        Detail_room.create({
            id_room: idRoom,
            id_user: player,
            jenis_player: jenis_player
        }).then()
    }
    return new Promise((resolve, reject) => {
        resolve('berhasil');
    })
}

module.exports = {
    getGamePage,
    createRoom,
}