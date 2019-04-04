const express = require("express");
const app = express();
const path = require('path')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const jsonParser = express.json();
const fs = require('fs');

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
app.use(bodyParser.urlencoded({
    extended: false
  }))
  
  require('./auth').init(app)
  redisStore = {
    url: 'redis://localhost',
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

app.get('/', function(req,res){
res.send("MAIN")
})

app.get('/api/users',  passport.authenticationMiddleware(),function(req, res){
    res.send("UsersList")
})
app.route('/api/users/:id',  passport.authenticationMiddleware())
    .get(function(req,res){
        var id = req.params.id
        res.send(id);
    })
    .post(function(req,res){
        res.send("i'm post");
    })
    .put(function(req,res){
        res.send("i'm put");
    })
    .delete(function(req,res){
        res.send("i'm delete");
    });
app.get('/api/wines', function(req, res){
    res.send("WinesList")
});
app.route('/api/wines/:id')
    .get(function(req,res){
        var id = req.params.id
        res.send(id);
    })
    .post(function(req,res){
        res.send("i'm post");
    })
    .put(function(req,res){
        res.send("i'm put");
    })
    .delete(function(req,res){
        res.send("i'm delete");
    })    
app.route('/api/reiting')
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
    
    var UserSchema = new mongoose.Schema({
        username: {
          type: String,
          unique: true,
          required: true
        },
        password: {
          type: String,
          required: true
        }
      });
      mongoose.model('user', UserSchema);
      mongoose.connect("mongodb://localhost:27017/wineappsdb", { useNewUrlParser: true }, function(err){
    if(err) return console.log(err);
    // app.listen(3000, function(){
    //     console.log("Сервер ожидает подключения...");
    // });
});
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/api/wines',
        failureRedirect: '/'
      }))  
    app.post('/register', function(req,res){
        var user = new User({ username: req.body.email, password: req.body.password});
    user.save(function(err) {
      return err
        ? next(err)
        : req.logIn(user, function(err) {
          return err
            ? next(err)
            : res.redirect('/private');
        });
    });
})   