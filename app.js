const express = require("express");
const app = express();
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
app.use(function(req, res, next){ 
  //auth
    next();
});
app.get('/api/users', function(req, res){
    res.send("UsersList")
})
app.route('/api/users/:id')
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
})   
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