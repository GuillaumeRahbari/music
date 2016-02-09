/**
 * Created by Quentin on 1/7/2016.
 */
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/FXMachine';
var mongoClient = mongodb.MongoClient;
var core = require("../../app/core/core");

function createUser(user ,callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        user._role = "user";
        user._pedals = [];
        collection.insert([user], function (err, result) {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                callback(null, {_id: result.ops[0]._id});
            }
        });
    });






    /*
    mongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
            callback(err);
        } else {
            var collection = db.collection('users');
            user._role = "user";
            user._pedals = [];
            collection.insert([user], function (err, result) {
                if (err) {
                    console.log(err);
                    callback(err, null);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                    callback(null, {_id: result.ops[0]._id});
                }
            })
        }
    }); */
}


function deleteUser(user, callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        collection.deleteOne([user], function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });





    /*
    mongoClient.connect(url, function(err, db) {
        if(err) {
            callback(err, null) ;
        } else {
            var collection = db.collection('users');
            collection.deleteOne([user], function(err, result) {
                if(err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        }
    }); */
}




/** work in progress **/
function updateUser(user, callback) {
    core.getDb(function(db) {
        var collection = db.collection('users');
        collection.updateOne( {_id : user._id }  ,user, function(err, result) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    });






    /*
    console.log("in user");
    console.log(user);
    mongoClient.connect(url, function(err, db) {
       if(err) {
           callback(err, null);
       } else {
           var collection = db.collection('users');
           collection.updateOne( {_id : user._id }  ,user, function(err, result) {
              if(err) {
                  callback(err, null);
              } else {
                  callback(null, result);
              }
           });
       }
    }); */
}

exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.createUser = createUser;
