const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const jsonParser = express.json();
const fs = require('fs');
var multer = require('multer');
//const path = require('path');
//var upload = multer({ dest: 'uploads/' })
//test
var multer       = require('multer');

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
   cb(null, './uploads');
},
filename: function (req, file, cb) {
   cb(null, file.originalname);
}
});

var upload = multer({ storage: storage });
//test


var User = require('./users/user')
var Wine = require('./wines/wine')

var port = 3000;
app.listen(port);

app.use(function (request, response, next) {

    let now = new Date();
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
    fs.appendFile("server.log", data + "\n", function () { });
    next();
});
   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
  
  require('./auth').init(app)

  redisStore = {
    url: 'redis://localhost:6379',
    secret: 'my-strong-secret'
  }
  app.use(session({
    store: new RedisStore({
      url: redisStore.url
    }),
    secret: redisStore.secret,
    resave: false,
    saveUninitialized: false
  }))
  
  app.use(passport.initialize())
  app.use(passport.session())

// app.get('/', passport.authenticationMiddleware(), function(req,res){
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// //res.send("MAIN")
// })
app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/public/index.html');
})

//app.get('/api/users',  passport.authenticationMiddleware(),function(req, res){
app.get('/api/users',function(req, res){
   User.getUsers(function(err, users){
    res.send(users)
   })
   
})
app.route('/api/users/:id',  passport.authenticationMiddleware())
    .get(function(req,res){
        var id = req.params.id
        User.getUserById(id, function(err, user){
            res.send(user);
        })
       
    })
    .put(function(req,res){
        User.updateUserById(req.params.id, req.body, function(err, user){
            res.send(user);
        })
    })
    .delete(function(req,res){
        res.send("i'm delete");
    });

    //test
 app.post('/profile', upload.single('avatar'), function (req, res, next) {
    var img = fs.readFileSync(req.file.path);

        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
      })
    //test  

app.get('/api/wines', function(req, res){
    res.send("WinesList")
});
app.post('/api/wines', function(req, res){
    var newWine = new Wine({
        name: req.body.name,
        rating: {'1': 0, '2': 0 , '3': 0, '4': 0, '5': 0}
      });
  
      Wine.createWine(newWine, function(err, wine){
        if(err) throw err;
        res.send(wine).end()
      });
});
app.route('/api/wines/:id')
    .get(function(req,res){
        var id = req.params.id
        res.send(id);
    })
    .put(function(req,res){
       var idWine = req.params.id
       var idUser = req.body.user
       var idRating = req.body.num

        Wine.addRatingWine(idWine, idRating, idUser, function(err, wine){
            if(err) throw err;
            res.send(wine).end()
          });
    })
    .delete(function(req,res){
        res.send("i'm delete");
    })    
app.route('/api/rating')
    .get(function(req,res){
        res.send("Top");
    })
    .post(function(req,res){
    var idWine= req.body.wine_id;
    var idUser= req.body.user_id;
    var num = req.body.num;    
        res.send('Вино: ${idWine} - Пользователь: ${idUser} - ${num}');
    })
    .put(function(req,res){
        res.send("i'm put");
    })
    .delete(function(req,res){
        res.send("i'm delete");
    })     
    
      mongoose.connect("mongodb://localhost:27017/wineappsdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
});
mongoose.set('useCreateIndex', true);
// Register User
app.post('/register', function(req, res){
    var password = req.body.password;
    var password2 = req.body.password2;
  console.log(req.body)
    if (password == password2){
      var newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
  
      User.createUser(newUser, function(err, user){
        if(err) throw err;
        res.send(user).end()
      });
    } else{
      res.status(500).send("{errors: \"Passwords don't match\"}").end()
    }
  });
  app.post('/login' ,
  passport.authenticate('local', 
  { successRedirect: '/',
  failureRedirect: '/login' }),
//  function(req,res){
 //   User.getUserByUsername(req.body.username)}
//   function(req, res) {
//     res.send(req.user);
//   }
);

app.get('/login', function(req,res){
    res.send("fail")
})
// Endpoint to get current user
app.get('/user', function(req, res){
  res.send(req.user);
})


// Endpoint to logout
app.get('/logout', function(req, res){
  req.logout();
  res.send(null)
});