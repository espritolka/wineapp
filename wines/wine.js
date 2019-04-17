var mongoose = require('mongoose');
//const bcrypt = require('bcrypt')
var User = require('../users/user')
var fs = require('fs');
// User Schema
var WineSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },  
    country: {
        type: String,
        index: true,
    },
    color: {
        type: String,
    },
    year: {
        type: Date,
    },
    img: { 
        data: Buffer,
        contentType: String 
    },
    rating: {
        type: Map,
        of: String,
    }
});

var Wine = module.exports = mongoose.model('Wine', WineSchema);

module.exports.addRatingWine = function (idWine, idRating, idUser, callback) {
    var valRating;
    var userarray = [];
    User.findOne({ _id: idUser }, function (err, suc) {
        userarray = suc.wines;
        userarray.push(idWine)
        User.updateOne({ _id: idUser }, { wines: userarray }, { new: true }, function (err, user) {
            if (err) return console.log(err);
            console.log('user' + user)
        });
    }).then(function (a) {

        Wine.findOne({ _id: idWine }, function (err, suc) {
            //      console.log(suc.name)
            valRating = Number(suc.rating.get(idRating)) + 1;
            console.log("value " + valRating)
        }).then(function (a) {
            // Wine.findOneAndUpdate(idWine, {rating:{idRating: valRating}}, {new: true}, function(err, wine){
            //     if(err) return console.log(err); 
            //     console.log("hello " + wine)
            //     //res.send(user);
            // })
            switch (idRating) {
                case '1':
                    Wine.updateOne({ _id: idWine }, {
                        "$set": { "rating.1": valRating }
                    }, { new: true }, callback
                        //( err, doc) => {
                        //     if (err) {
                        //         console.log("error " + err)
                        //     }
                        //     console.log(doc);
                        // }
                    );
                    break;
                case '2':
                    Wine.updateOne({ _id: idWine }, {
                        "$set": { "rating.2": valRating }
                    }, { new: true }, callback);
                    break;
                case '3':
                    Wine.updateOne({ _id: idWine }, {
                        "$set": { "rating.3": valRating }
                    }, { new: true }, callback);
                    break;
                case '4':
                    Wine.updateOne({ _id: idWine }, {
                        "$set": { "rating.4": valRating }
                    }, { new: true }, callback);
                    break;
                case '5':
                    Wine.updateOne({ _id: idWine }, {
                        "$set": { "rating.5": valRating }
                    }, { new: true }, callback);
                    break;
                default:
                    break;
            }

        }, (error) => console.log("error " + error))

    });//end user update
}


module.exports.createWine = function (newWine, callback) {

    newWine.save(callback);

}
module.exports.getWineByName = function (winename, callback) {
    var query = { winename: winename };
    Wine.findOne(query, callback);
}

module.exports.getWineById = function (id, callback) {
    Wine.findById(id, callback);
}


