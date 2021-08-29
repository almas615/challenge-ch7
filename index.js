const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const sessions = require('express-session');

const port = 3000;
 
let users = require('./db/user.json');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sessions({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));





// routing halaman home
app.get('/',(req, res)=>{
    data = {
        judul : "home",
        email: req.session.email
    }
    res.render('index',data,console.log(req.session.email));
});

// get all users
app.get('/users',(req, res)=>{
    res.status(200).json(users);
})

// routing halaman game
app.get('/game',(req, res)=>{
    data = {
        judul : "Game Suit"
    }
    res.render('gameSuit', data);
});

// login proses
app.post('/login', (req, res) => {
    const sess = req.session;
    let get = [];
    // cari apakah email dan password sesuai dengan yang ada pada users
    get =users.find((item) => {
        if (item.email == req.body.email && item.password == req.body.password) {
            return item;
        }
    });
    if(get == undefined){
        res.redirect('/login');
    } else{
        sess.email = req.body.email;
        res.redirect(`/`);
    }
    
});

// login halaman
app.get('/login',(req, res)=>{
    res.render('login');
});


// register prosess
app.post('/register',(req, res)=>{
    const user = {
        nama : req.body.nama,
        email : req.body.email,
        password : req.body.password
    }
    let get =[];
    // validasi jika email sudah terdaftar
    get = users.find((item) => {
        if (item.email == req.body.email) {
            return item;
        }
    });

    if (get == undefined) {// jika email belum terdaftar maka simpan
        // const dataFileUser = fs.readFileSync('db/user.json', 'utf8'); // ambilsemua data pada json
        // const dataUsers = JSON.parse(dataFileUser); //masukan data pada file json ke dalam objec users
        
        users.push(user); // tambahkan data user baru ke dalam users
        
        fs.writeFileSync('db/user.json', JSON.stringify(users)); // timpa data file json dengan data baru
        
        res.redirect('/');
    }else{ // jika email sudah terdaftar maka kembalikan ke halaman register
        res.redirect('/register');
    }
    
    
})

// halamat register
app.get('/register',(req, res)=>{
    res.render('register');
})

// proses logout
app.get('/logout',(req, res)=>{
    req.session.destroy();
    res.redirect('/');
})
// app.post('/')

app.listen(port);