// Include Mongoose ORM to connect with database
var Mongoose = require('mongoose');

//load database
Mongoose.connect('mongodb://localhost/missingchildren')
var db = Mongoose.connection;

//this is will happen when we got an errror while connecting with database
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function callback(){
    console.log('Connection with database succeeded.')
});

exports.db =db;
