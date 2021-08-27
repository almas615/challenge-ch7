const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
 let users = require('./db/user.json');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',(req, res)=>{
    data = {
        judul : "home",
        email : req.query.email
    }
    res.render('index',data);
});

app.get('/game',(req, res)=>{
    data = {
        judul : "Game Suit"
    }
    res.render('gameSuit', data);
});

app.post('/login', (req, res) => {
    let get = [];
    get =users.find((item) => {
      if (item.email == req.body.email && item.password == req.body.password) {
          return item;
      }
    });
    if(get == undefined){
        res.redirect('/');
    } else{
        res.redirect('/?email='+get.email);
    }
    
  });

app.get('/login',(req, res)=>{
    res.render('login');
});
// app.post('/')

app.listen(port);