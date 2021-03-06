// Including the Mongoose ORM to connect with Mongo DB
const Mongoose = require('mongoose');


// const databaseURI = 'mongodb://kumar:mera55555#@ds141641.mlab.com:41641/merakaamkaaj';
const mongoDbUri = 'mongodb://missing:missing123@ds119503.mlab.com:19503/missing_child';

//mongodb://<dbuser>:<dbpassword>@ds141641.mlab.com:41641/merakaamkaaj
// Making connection with 'MongoDB'
Mongoose.connect(mongoDbUri, { useMongoClient:true })

//Variable to store the database connection
var db = Mongoose.connection;

//Handling errors!
db.on('error', console.error.bind(console, 'connection error'));


db.once('open', function callback(){
    console.log('Connection with database succeeded ' + mongoDbUri);
});

exports.db=db;

