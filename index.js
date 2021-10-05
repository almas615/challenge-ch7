const express = require('express');
const app = express();
const fs = require('fs');
const sessions = require('express-session');
const port = process.env.PORT || 8000;



const {
    User_game,
    User_game_biodata,
    User_game_history
} = require('./models')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(
    express.urlencoded({
        extended: false
    })
)
const router = require("./router");
app.use(router);





// // routing halaman home
// app.get('/', (req, res) => {
//     data = {
//         judul: "home",
//         email: req.session.email
//     }
//     res.render('index', data, console.log(req.session));
// });



// // routing halaman game
// app.get('/game', (req, res) => {
//     data = {
//         judul: "Game Suit"
//     }
//     res.render('gameSuit', data);
// });

// // login proses
// app.post('/login', (req, res) => {
//     let sess = req.session;
//     let get = [];
//     // cari apakah email dan password sesuai dengan yang ada pada users
//     get = users.find((item) => {
//         if (item.email == req.body.email && item.password == req.body.password) {
//             return item;
//         }
//     });
//     if (get == undefined) {
//         res.redirect('/login');
//     } else {
//         sess.email = get.email;
//         sess.hak_akses = get.hak_akses;
//         if (get.hak_akses == "superuser") {
//             res.redirect('/dashboard')
//         } else {
//             res.redirect(`/`);
//         }

//     }

// });

// // login halaman
// app.get('/login', (req, res) => {
//     data = {
//         judul: "halaman login"
//     }
//     res.render('login', data);
// });


// // register prosess
// app.post('/register', (req, res) => {
//     const user = {
//         nama: req.body.nama,
//         email: req.body.email,
//         password: req.body.password
//     }
//     let get = [];
//     // validasi jika email sudah terdaftar
//     get = users.find((item) => {
//         if (item.email == req.body.email) {
//             return item;
//         }
//     });

//     if (get == undefined) { // jika email belum terdaftar maka simpan
//         // const dataFileUser = fs.readFileSync('db/user.json', 'utf8'); // ambilsemua data pada json
//         // const dataUsers = JSON.parse(dataFileUser); //masukan data pada file json ke dalam objec users

//         users.push(user); // tambahkan data user baru ke dalam users

//         fs.writeFileSync('db/user.json', JSON.stringify(users)); // timpa data file json dengan data baru

//         res.redirect('/');
//     } else { // jika email sudah terdaftar maka kembalikan ke halaman register
//         console.log('email sudah terdaftar')
//         res.redirect('/register');
//     }


// })

// // halamat register
// app.get('/register', (req, res) => {
//     data = {
//         judul: "halaman register"
//     }
//     res.render('register', data);
// })

// // proses logout
// app.get('/logout', (req, res) => {
//     req.session.destroy();
//     res.redirect('/');
// })

// //dashboard

// app.get('/dashboard', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game.findAll({
//                 include: {
//                     model: User_game_biodata,
//                     as: 'biodata'
//                 }
//             })
//             .then(users => {
//                 // res.render('dashboard/users', {
//                 //     users
//                 // })
//                 res.render('dashboard', {
//                     users
//                 })
//             })
//     } else {
//         res.redirect('/notFoundPage')
//     }
// })

// // find all users
// app.get('/users', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game.findAll()
//             .then(users => {
//                 // res.render('dashboard/users', {
//                 //     users
//                 // })
//                 res.json(users)
//             })
//     } else {
//         res.render('erorPage/notFound')
//     }
// })
// // find one detail user
// app.get('/user/detail/:id', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game.findOne({
//                 where: {
//                     id: req.params.id
//                 },
//                 include: {
//                     model: User_game_biodata,
//                     as: 'biodata'
//                 }
//             })
//             .then(user => {
//                 // res.render('dashboard/detail', {
//                 //     user
//                 // })
//                 res.json(user)
//             })
//     } else {
//         res.redirect('/notFoundPage')
//     }
// })
// // create user
// app.post('/user/create', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game.create({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password
//             })
//             .then(() => {
//                 User_game.findOne({
//                         attributes: ['id'],
//                         order: [
//                             ['id', 'DESC']
//                         ]
//                     })
//                     .then(user => {

//                         User_game_biodata.create({
//                                 user_id: user.id,
//                                 nama: req.body.nama
//                             })
//                             .then(() => {
//                                 res.redirect('/dashboard')

//                             })
//                     })
//             })
//     } else {
//         res.redirect('/notFoundPage')
//     }
// })

// app.post('/user/update/:id', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game.update({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: req.body.password
//             }, {
//                 where: {
//                     id: req.params.id
//                 }
//             })
//             .then(() => {
//                 User_game_biodata.update({
//                         nama: req.body.nama
//                     }, {
//                         where: {
//                             user_id: req.params.id
//                         }
//                     })
//                     .then(() => {
//                         res.redirect('/dashboard')
//                     })
//             })
//     } else {
//         res.redirect('/notFoundPage')
//     }
// })

// app.get('/user/delete/:id', (req, res) => {
//     let sess = req.session;
//     if (sess.email !== undefined && sess.hak_akses == "superuser") {
//         User_game_biodata.destroy({
//                 where: {
//                     user_id: req.params.id
//                 }
//             })
//             .then(() => {
//                 User_game.destroy({
//                         where: {
//                             id: req.params.id
//                         }
//                     })
//                     .then(() => {
//                         res.redirect('/dashboard')
//                     })
//             })
//     } else {
//         res.redirect('/notFoundPage')
//     }
// })

// app.get('/notFoundPage', (req, res) => {
//     res.render('erorPage/notFound')
// })

app.listen(port, () => {
    console.log('server nyala di port 3000!');
});