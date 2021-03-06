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

//fungsi untuk mengecek apakah game telah selesai
const isFightEnd = (idRoom) => {
    return new Promise((resolve, reject) => {
        Detail_room.findAll({
                where: {
                    id_room: idRoom
                },
                attributes: ['pilihan_player']
            })
            .then((pilihan) => {
                if (pilihan[0].pilihan_player != null && pilihan[1].pilihan_player != null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
                reject(false)
            })
    })
}

// fungsi untuk mengecek apakah user telah terdata sebagai player1
const isUserPlayer1 = (idUser, idRoom) => {
    return new Promise((resolve, reject) => {
        Detail_room.findOne({
                where: {
                    id_room: idRoom,
                    jenis_player: 'player1'
                },
                attributes: ['id_user']
            })
            .then((Player1) => {
                if (Player1.id_user == idUser) {
                    resolve(true)
                } else {
                    resolve(false)
                }
                reject('data tidak valid')
            })
    })
}

//fungsi untuk mengecek apakah user terlah terdata sebagai player 2
const isUserPlayer2 = (idUser, idRoom) => {
    return new Promise((resolve, reject) => {
        Detail_room.findOne({
                where: {
                    id_room: idRoom,
                    jenis_player: 'player2'
                },
                attributes: ['id_user']
            })
            .then((Player2) => {
                if (Player2.id_user == idUser) {
                    resolve(true)
                } else {
                    resolve(false)
                }
                reject('data tidak valid')
            })
    })
}

//fungsi untuk mengecek apakah slot player 2 belum terisi
const isPlayer2Empty = (idRoom) => {
    return new Promise((resolve, reject) => {
        Detail_room.findOne({
                where: {
                    id_room: idRoom,
                    jenis_player: 'player2'
                },
                attributes: ['id_user']
            })
            .then((Player2) => {
                if (Player2.id_user == null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
                reject('data tidak valid')
            })
    })
}

//fungsi untuk mengecek apakah jumlah pilihan
const checkPilihanItem = (pilihan) => {
    return new Promise((resolve, reject) => {
        if (pilihan.length == 3) return resolve(true);
        resolve(false)
    })
}

// fungsi untuk mengecek apkah pilihan player1 masih kosong
const isPilihanPlayer1Empty = (idRoom) => {
    return new Promise((resolve, reject) => {
        Detail_room.findOne({
                where: {
                    id_room: idRoom,
                    jenis_player: 'player1'
                },
                attributes: ['pilihan_player']
            })
            .then((Player1) => {
                if (Player1.pilihan_player == null) {
                    resolve(true)
                } else {
                    resolve(false)
                }
                reject('data tidak valid')
            })
    })
}

// fungsi untuk menginputkan pilihan player1
const insertPilihanPlayer1 = (pilihan, idRoom) => {
    return new Promise((resolve, reject) => {
        if (pilihan.length == 3) {
            Detail_room.update({
                    pilihan_player: pilihan
                }, {
                    where: {
                        id_room: idRoom,
                        jenis_player: 'player1'
                    }
                })
                .then(async () => {
                    let hasil = await hitungHasil(idRoom) // mengitung hasil jika game sudah selesai
                    resolve("player 1 berhasil input pilihan (" + hasil + ")")
                })

        } else {
            resolve("pilihan harus berjumlah 3")
        }
    })
}

//fungsi untuk menginputkan pilihan player 2
const insertPilihanPlayer2 = (idUser, pilihan, idRoom) => {
    return new Promise((resolve, reject) => {
        if (pilihan.length == 3) {
            Detail_room.update({
                    id_user: idUser,
                    pilihan_player: pilihan
                }, {
                    where: {
                        id_room: idRoom,
                        jenis_player: 'player2'
                    }
                })
                .then(async () => {
                    let hasil = await hitungHasil(idRoom) // mengitung hasil jika game sudah selesai
                    resolve("player 2 berhasil input pilihan (" + hasil + ")")
                })

        } else {
            resolve("pilihan harus berjumlah 3")
        }
    })
}

// fungsi aturan game suit
const rule = (player1, player2) => {
    if (player1 == player2) return "seri";
    if (player1 == "batu") return (player2 == "kertas") ? "player2" : "player1";
    if (player1 == "kertas") return (player2 == "batu") ? "player1" : "player2";
    if (player1 == "gunting") return (player2 == "kertas") ? "player1" : "player2";
}

// fungsi untuk menghitung hasil pemenang game
const hitungHasil = (idRoom) => {
    return new Promise(async (resolve, reject) => {
        let fightEnd = await isFightEnd(idRoom)
        if (!fightEnd) return resolve("sedang menunggu lawan memilih");
        let player1,
            player2,
            hasilTemp = [];
        await Detail_room.findOne({
                attributes: ['id_user', 'pilihan_player'],
                where: {
                    jenis_player: 'player1',
                    id_room: idRoom
                }
            })
            .then((player) => {
                player1 = {
                    id_user: player.id_user,
                    pilihan_player: player.pilihan_player
                };

            })
        await Detail_room.findOne({
                attributes: ['id_user', 'pilihan_player'],
                where: {
                    jenis_player: 'player2',
                    id_room: idRoom
                }
            })
            .then((player) => {
                player2 = {
                    id_user: player.id_user,
                    pilihan_player: player.pilihan_player
                };

            })

        for (let i = 0; i <= 2; i++) {
            hasilTemp.push(rule(player1.pilihan_player[i], player2.pilihan_player[i]))

        }
        console.log(hasilTemp)
        let hasilPlayer1 = 0,
            hasilPlayer2 = 0;
        hasilTemp.forEach((hasil) => {
            if (hasil == "player1") return hasilPlayer1++;
            if (hasil == "player2") return hasilPlayer2++;
        })
        let data = {
            player1: player1.id_user,
            player2: player2.id_user,
            hasil1: hasilPlayer1,
            hasil2: hasilPlayer2
        };

        await insertGameHistory({
            data
        })

        resolve("game selesai")
    })
}

// fungsi untuk memasukkan hasil pemenang game ke tabel history
const insertGameHistory = async ({
    data
}) => {
    if (data.hasil1 == data.hasil2) {
        await User_game_history.create({
            user_id: data.player1,
            result: "seri"
        })
        await User_game_history.create({
            user_id: data.player2,
            result: "seri"
        })

    }
    if (data.hasil1 > data.hasil2) {
        await User_game_history.create({
            user_id: data.player1,
            result: "menang"
        })
        await User_game_history.create({
            user_id: data.player2,
            result: "kalah"
        })
    }

    if (data.hasil1 < data.hasil2) {
        await User_game_history.create({
            user_id: data.player1,
            result: "kalah"
        })
        await User_game_history.create({
            user_id: data.player2,
            result: "menang"
        })
    }

    return new Promise((resolve, reject) => {
        resolve('selesai')
    })
}

const fight = async (req, res) => {
    // res.send(await hitungHasil(req.params.idRoom))
    let fightEnd = await isFightEnd(req.params.idRoom)
    if (fightEnd) return res.send("gam sudah selesai"); // jika game selesai maka endpind tidak bisa diakses
    let userPlayer1 = await isUserPlayer1(req.user.id, req.params.idRoom)
    let userPlayer2 = await isUserPlayer2(req.user.id, req.params.idRoom)
    let player2Empty = await isPlayer2Empty(req.params.idRoom)
    // let pilihanItem = await checkPilihanItem(req.body.pilihan)
    let pilihanPlayer1Empty = await isPilihanPlayer1Empty(req.params.idRoom)

    if (userPlayer1 && !pilihanPlayer1Empty) return res.send("player1 sudah memilih") // jika user adalah player 1 dan pilihan masih kosong maka isi pilihan player 1
    if (userPlayer1 && pilihanPlayer1Empty) return res.send(await insertPilihanPlayer1(req.body.pilihan, req.params.idRoom)) // jika user adalah player1 dan pilihan sudah terisis maka player 1 sudah memilih
    if (userPlayer2) return res.send("player 2 telah memilih") // jika user adalah player 2 maka player 2 sudah memilih ( karena ketika insert pilihan sekaligus insert iduser)
    if (player2Empty) return res.send(await insertPilihanPlayer2(req.user.id, req.body.pilihan, req.params.idRoom))
    if (!player2Empty) return res.send("slot player sudah penuh") // jika player 2 kosong maka insert idUser dan pilihan player // jika game belum selesai dan user bukan player 1 atau 2 dan player2 sudah terisi maka slot player penuh
    console.log('test')

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

//fungsi untuk men generete isi dari table detail room
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
    fight,
    hitungHasil
}