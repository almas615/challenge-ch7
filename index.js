const express = require('express');
const app = express();
const fs = require('fs');
const sessions = require('express-session');
const port = 3000;
let users = require('./db/user.json');
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
app.use(sessions({
    secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true
}));


// routing halaman home
app.get('/', (req, res) => {
    data = {
        judul: "home",
        email: req.session.email
    }
    res.render('index', data, console.log(req.session));
});



// routing halaman game
app.get('/game', (req, res) => {
    data = {
        judul: "Game Suit"
    }
    res.render('gameSuit', data);
});

// login proses
app.post('/login', (req, res) => {
    const sess = req.session;
    let get = [];
    // cari apakah email dan password sesuai dengan yang ada pada users
    get = users.find((item) => {
        if (item.email == req.body.email && item.password == req.body.password) {
            return item;
        }
    });
    if (get == undefined) {
        res.redirect('/login');
    } else {
        sess.email = req.body.email;
        if (get.hak_akses == "superuser") {
            res.redirect('/dashboard')
        } else {
            res.redirect(`/`);
        }

    }

});

// login halaman
app.get('/login', (req, res) => {
    data = {
        judul: "halaman login"
    }
    res.render('login', data);
});


// register prosess
app.post('/register', (req, res) => {
    const user = {
        nama: req.body.nama,
        email: req.body.email,
        password: req.body.password
    }
    let get = [];
    // validasi jika email sudah terdaftar
    get = users.find((item) => {
        if (item.email == req.body.email) {
            return item;
        }
    });

    if (get == undefined) { // jika email belum terdaftar maka simpan
        // const dataFileUser = fs.readFileSync('db/user.json', 'utf8'); // ambilsemua data pada json
        // const dataUsers = JSON.parse(dataFileUser); //masukan data pada file json ke dalam objec users

        users.push(user); // tambahkan data user baru ke dalam users

        fs.writeFileSync('db/user.json', JSON.stringify(users)); // timpa data file json dengan data baru

        res.redirect('/');
    } else { // jika email sudah terdaftar maka kembalikan ke halaman register
        console.log('email sudah terdaftar')
        res.redirect('/register');
    }


})

// halamat register
app.get('/register', (req, res) => {
    data = {
        judul: "halaman register"
    }
    res.render('register', data);
})

// proses logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
})

//dashboard

app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// find all users
app.get('/users', (req, res) => {
    User_game.findAll()
        .then(users => {
            // res.render('dashboard/users', {
            //     users
            // })
            res.json(users)
        })
})
// find one detail user
app.get('/user/detail/:id', (req, res) => {
    User_game.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User_game_biodata,
                as: 'biodata'
            }
        })
        .then(user => {
            // res.render('dashboard/detail', {
            //     user
            // })
            res.json(user)
        })
})
// create user
app.post('/user/create', (req, res) => {
    User_game.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
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
                            // res.redirect('/users')
                            res.send(user);
                        })
                })
        })
})

app.get('/user/update/:id', (req, res) => {
    User_game.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: User_game_biodata,
                as: 'biodata'
            }
        })
        .then(user => {
            // res.render('dashboard/update', {
            //     user
            // })
            res.json(user)
        })
})

app.post('/user/update/:id', (req, res) => {
    User_game.update({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
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
                    res.redirect('/user/detail/' + req.params.id)
                })
        })
})

app.get('/user/delete/:id', (req, res) => {

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
})

app.listen(port, () => {
    console.log('server nyala di port 3000!');
});