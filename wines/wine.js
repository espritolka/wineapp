var mongoose = require('mongoose');
const bcrypt = require('bcrypt')
var User = require('../users/user')
// User Schema
var WineSchema = mongoose.Schema({
    name: {
        type: String,
        index: true,
        unique: true,
    },
    rating: {
        type: Map,
        of: String,
    }
});

var Wine = module.exports = mongoose.model('Wine', WineSchema);

module.exports.addRatingWine = function (idWine, idRating, idUser, callback) {
    var valRating;
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
                }, { new: true }, callback
                //( err, doc) => {
                //     if (err) {
                //         console.log("error " + err)
                //     }
                //     console.log(doc);
                // }
                );
                break;
            case '3':
                Wine.updateOne({ _id: idWine }, {
                    "$set": { "rating.3": valRating }
                }, { new: true }, callback
                //( err, doc) => {
                //     if (err) {
                //         console.log("error " + err)
                //     }
                //     console.log(doc);
                // }
                );
                break;
            case '4':
                Wine.updateOne({ _id: idWine }, {
                    "$set": { "rating.4": valRating }
                }, { new: true }, callback
                // (err, doc) => {
                //     if (err) {
                //         console.log("error " + err)
                //     }
                //     console.log(doc);
                // }
                
                );
                break;
            case '5':
                Wine.updateOne({ _id: idWine }, {
                    "$set": { "rating.5": valRating }
                }, { new: true }, callback
                // (err, doc) => {
                //     if (err) {
                //         console.log("error " + err)
                //     }
                //     console.log(doc);
                // }
                );
                break;
            default:
                break;
        }
        // Wine.updateOne({_id : idWine}, {           
        //         "$set":{ "rating.4":valRating}} , {new: true}, (err, doc) => {
        //     if (err) {
        //         console.log("error " + err)
        //     }
        //     console.log(doc);
        // });
    }, (error) => console.log("error " + error))
    var userarray = [];
    User.findOne({ _id: idUser }, function (err, suc) {
        userarray = suc.wines;
        userarray.push(idWine)
        User.updateOne({ _id: idUser }, { wines: userarray }, { new: true }, function (err, user) {
            if (err) return console.log(err);
            console.log(user)
        });
    });


    // Wine.save(callback);
    //return Wine.findOne({ _id: idWine }, function (err, suc) {
    //});

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


